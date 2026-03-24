#!/usr/bin/env node
/**
 * update-price.mjs
 *
 * Updates the `cost` field on the most recent Price record for a given productId.
 *
 * Usage:
 *   node scripts/update-price.mjs [productId] [newCost] [env]
 *
 * Arguments (all optional — defaults shown below):
 *   productId  - The product UUID to look up              (default: 4e9dcab3-e08d-4648-834a-0bc982cb14b5)
 *   newCost    - The new cost integer value in CLP pesos  (default: 19)
 *   env        - "PROD" | "DEV"                           (default: PROD)
 *
 * Examples:
 *   node scripts/update-price.mjs
 *   node scripts/update-price.mjs 4e9dcab3-e08d-4648-834a-0bc982cb14b5 19
 *   node scripts/update-price.mjs 4e9dcab3-e08d-4648-834a-0bc982cb14b5 299000 DEV
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// --- CLI args ---
const [, , productIdArg, newCostArg, envArg] = process.argv;
const PRODUCT_ID = productIdArg ?? "4e9dcab3-e08d-4648-834a-0bc982cb14b5";
const NEW_COST = Number(newCostArg ?? 19);
const ENV = (envArg ?? "PROD").toUpperCase();

if (isNaN(NEW_COST)) {
  console.error("❌  newCost must be a number");
  process.exit(1);
}

// --- Load Amplify outputs to get endpoint + API key ---
const outputsFile = ENV === "DEV" ? "amplify_outputs_dev.json" : "amplify_outputs.json";
const outputs = JSON.parse(readFileSync(resolve(ROOT, outputsFile), "utf-8"));
const GRAPHQL_URL = outputs.data.url;
const API_KEY = outputs.data.api_key;

async function graphql(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  return json.data;
}

// --- Step 1: list prices by productId, sorted DESC by startDate, take first ---
const LIST_QUERY = /* GraphQL */ `
  query ListPriceByProductId($productId: ID!) {
    listPriceByProductIdAndStartDate(productId: $productId, sortDirection: DESC, limit: 10) {
      items {
        priceId
        cost
        startDate
        status
      }
    }
  }
`;

// --- Step 2: update cost ---
const UPDATE_MUTATION = /* GraphQL */ `
  mutation UpdatePrice($priceId: ID!, $cost: Int!) {
    updatePrice(input: { priceId: $priceId, cost: $cost }) {
      priceId
      cost
      productId
      startDate
      status
    }
  }
`;

(async () => {
  console.log(`\n🔍  Looking up prices for productId: ${PRODUCT_ID}  [${ENV}]`);
  console.log(`    Endpoint: ${GRAPHQL_URL}\n`);

  const listData = await graphql(LIST_QUERY, { productId: PRODUCT_ID });
  const items = listData?.listPriceByProductIdAndStartDate?.items ?? [];

  if (items.length === 0) {
    console.error("❌  No Price records found for this productId.");
    process.exit(1);
  }

  console.log(`📋  Found ${items.length} price record(s):`);
  items.forEach((p, i) =>
    console.log(`    [${i}] priceId=${p.priceId}  cost=${p.cost}  startDate=${p.startDate}  status=${p.status}`)
  );

  // Take the most recent (first after DESC sort)
  const target = items[0];
  console.log(`\n✏️   Updating priceId=${target.priceId}  cost: ${target.cost} → ${NEW_COST}`);

  const updateData = await graphql(UPDATE_MUTATION, { priceId: target.priceId, cost: NEW_COST });
  const updated = updateData?.updatePrice;

  console.log(`\n✅  Done!`);
  console.log(`    priceId   : ${updated.priceId}`);
  console.log(`    productId : ${updated.productId}`);
  console.log(`    cost      : ${updated.cost}`);
  console.log(`    startDate : ${updated.startDate}`);
  console.log(`    status    : ${updated.status}\n`);
})().catch((err) => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
