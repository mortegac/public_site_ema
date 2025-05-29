import { MainTypes } from "../../../../amplify/data/main.schema";
import { QueryFactory } from "../QueryFactory";
import { fetchPaymentTransactionByToken } from "./fetchTransactionByToken";

export const PaymentTransaction = QueryFactory<"PaymentTransaction">({ name: "PaymentTransaction" });
export type PaymentTransactionType = MainTypes["PaymentTransaction"]["type"];
export { fetchPaymentTransactionByToken };

