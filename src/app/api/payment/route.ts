import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

// ─── AppSync config (same pattern as /api/cotizar) ───────────────────────────
function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

async function callAppSync(
  url: string,
  apiKey: string,
  query: string,
  variables: Record<string, unknown>
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join('; '))
  return json.data
}

// ─── GraphQL mutations ────────────────────────────────────────────────────────
const CREATE_SHOPPING_CART = /* GraphQL */ `
  mutation CreateShoppingCart($input: CreateShoppingCartInput!) {
    createShoppingCart(input: $input) {
      shoppingCartId
      total
      vat
      typeOfCart
      paymentMethod
      status
      customerId
    }
  }
`

const WEBPAY_START = /* GraphQL */ `
  mutation webpayStart($shoppingCartId: ID!, $glosa: String!) {
    WebpayStart(shoppingCartId: $shoppingCartId, glosa: $glosa) {
      order
      token
      url
      message
      buy_order
      email
    }
  }
`

// ─── Request body schema ──────────────────────────────────────────────────────
interface PaymentBody {
  total: number           // gross price with IVA in CLP
  vat: number             // IVA amount in CLP
  email: string           // customer email (used as customerId)
  glosa?: string          // description for Webpay (default: "Visita técnica instalación cargador EV")
  address?: string        // installation address (for reference)
  tipo?: string           // 'casa' | 'edificio'
  chargerName?: string    // charger model name
  dist?: number           // distance in meters
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: PaymentBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { total, vat, email, glosa = 'Visita técnica instalación cargador EV' } = body

  if (!total || total <= 0) {
    return NextResponse.json({ error: 'total must be a positive number' }, { status: 400 })
  }
  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()

  // ── Step 1: Create ShoppingCart ──────────────────────────────────────────────
  let shoppingCartId: string

  try {
    const cartInput: Record<string, unknown> = {
      shoppingCartId: crypto.randomUUID(),
      total: Math.round(total),
      vat: Math.round(vat ?? 0),
      typeOfCart: 'visit',       // 'visit' matches the WebpayStart Lambda expectation
      paymentMethod: 'transbank',
      status: 'pending',
      // Note: omit customerId to avoid GSI type mismatch when customer doesn't exist yet
      // The email is passed as glosa context instead
    }

    console.log('[/api/payment] Creating ShoppingCart:', cartInput)

    const cartData = await callAppSync(appsyncUrl, apiKey, CREATE_SHOPPING_CART, { input: cartInput })
    shoppingCartId = cartData?.createShoppingCart?.shoppingCartId

    if (!shoppingCartId) throw new Error('createShoppingCart returned no shoppingCartId')

    console.log('[/api/payment] ShoppingCart created:', shoppingCartId)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/payment] createShoppingCart error:', message)
    return NextResponse.json({ error: `createShoppingCart failed: ${message}` }, { status: 502 })
  }

  // ── Step 2: WebpayStart ──────────────────────────────────────────────────────
  try {
    console.log('[/api/payment] Starting Webpay for cart:', shoppingCartId, 'glosa:', glosa)

    const webpayData = await callAppSync(appsyncUrl, apiKey, WEBPAY_START, {
      shoppingCartId,
      glosa,
    })

    const result = webpayData?.WebpayStart

    if (!result?.token) throw new Error('WebpayStart returned no token')

    console.log('[/api/payment] WebpayStart success, order:', result.order)

    return NextResponse.json({
      shoppingCartId,
      order: result.order,
      token: result.token,
      url: result.url,
      message: result.message,
      buy_order: result.buy_order,
      email: result.email,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/payment] WebpayStart error:', message)
    return NextResponse.json({ error: `WebpayStart failed: ${message}` }, { status: 502 })
  }
}
