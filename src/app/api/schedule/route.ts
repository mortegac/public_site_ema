import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

// ─── AppSync config ───────────────────────────────────────────────────────────
function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

// Returns json — logs full response; throws only on HTTP error
async function callAppSync(
  url: string,
  apiKey: string,
  query: string,
  variables: Record<string, unknown>,
  label: string
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${label}: AppSync HTTP ${res.status} — ${text.slice(0, 300)}`)
  }

  const json = await res.json()
  console.log(`[schedule] ${label} raw response:`, JSON.stringify(json).slice(0, 500))

  if (json.errors?.length && !json.data) {
    throw new Error(`${label}: ${json.errors.map((e: any) => e.message).join('; ')}`)
  }

  return json
}

// ─── GraphQL queries / mutations ──────────────────────────────────────────────
const MAKE_RESERVATION_AND_CART = /* GraphQL */ `
  mutation MakeReservationAndCart($customerId: String!, $calendarId: String!) {
    MakeReservationAndCart(customerId: $customerId, calendarId: $calendarId) {
      message
      cartId
    }
  }
`

const GET_SHOPPING_CART = /* GraphQL */ `
  query GetShoppingCart($shoppingCartId: ID!) {
    getShoppingCart(shoppingCartId: $shoppingCartId) {
      shoppingCartId
      customerId
    }
  }
`

// ─── Request body schema ──────────────────────────────────────────────────────
interface ScheduleBody {
  calendarId: string
  shoppingCartId?: string  // used to look up real customerId
  customerId?: string      // fallback if shoppingCartId not provided
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: ScheduleBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { calendarId, shoppingCartId, customerId: customerIdFromBody } = body

  if (!calendarId) {
    return NextResponse.json({ error: 'calendarId is required' }, { status: 400 })
  }

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()

  // ── Resolve customerId ──────────────────────────────────────────────────────
  let customerId = customerIdFromBody ?? ''

  if (shoppingCartId && (!customerId || customerId === 'guest')) {
    try {
      const cartJson = await callAppSync(appsyncUrl, apiKey, GET_SHOPPING_CART, { shoppingCartId }, 'getShoppingCart')
      const cartCustomerId: string = cartJson?.data?.getShoppingCart?.customerId ?? ''
      if (cartCustomerId && cartCustomerId !== 'guest') {
        customerId = cartCustomerId
        console.log(`[schedule] Resolved customerId from ShoppingCart: ${customerId}`)
      }
    } catch (err) {
      console.warn('[schedule] Could not resolve customerId from ShoppingCart:', err instanceof Error ? err.message : err)
    }
  }

  if (!customerId || customerId === 'guest') {
    return NextResponse.json(
      { error: 'Could not resolve a valid customerId. Ensure the customer email was captured during payment.' },
      { status: 400 }
    )
  }

  // ── MakeReservationAndCart ──────────────────────────────────────────────────
  console.log(`[schedule] MakeReservationAndCart — customerId=${customerId}, calendarId=${calendarId}`)

  try {
    const json = await callAppSync(
      appsyncUrl,
      apiKey,
      MAKE_RESERVATION_AND_CART,
      { customerId, calendarId },
      'MakeReservationAndCart'
    )

    const result = json?.data?.MakeReservationAndCart
    const message: string = result?.message ?? ''
    const cartId: string = result?.cartId ?? ''

    return NextResponse.json({ message, cartId })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[schedule] MakeReservationAndCart error:', message)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
