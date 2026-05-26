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

// Returns json.data — logs full response; throws only on HTTP error
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
  console.log(`[payment] ${label} raw response:`, JSON.stringify(json).slice(0, 500))

  // Surface AppSync errors (but still return data if present)
  if (json.errors?.length && !json.data) {
    throw new Error(`${label}: ${json.errors.map((e: any) => e.message).join('; ')}`)
  }

  return json
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

const CREATE_SHOPPING_CART_DETAIL = /* GraphQL */ `
  mutation CreateShoppingCartDetail($input: CreateShoppingCartDetailInput!) {
    createShoppingCartDetail(input: $input) {
      shoppingCartDetailId
      shoppingCartId
      glosa
      price
      typeOfItem
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
  total: number
  vat: number
  email?: string
  glosa?: string
  address?: string
  tipo?: string
  chargerName?: string
  dist?: number
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: PaymentBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    total,
    vat = 0,
    email,
    glosa = 'Visita técnica instalación cargador EV',
    chargerName = 'Instalación cargador EV',
  } = body

  if (!total || total <= 0) {
    return NextResponse.json({ error: 'total must be a positive number' }, { status: 400 })
  }

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()
  const shoppingCartId = crypto.randomUUID()

  console.log(`[payment] Starting payment flow — total=${total}, cartId=${shoppingCartId}`)
  console.log(`[payment] email=${email ?? 'NOT_PROVIDED'}, typeOfCart=chargerInstallation`)

  // ── Step 1: Create ShoppingCart ──────────────────────────────────────────────
  try {
    const cartInput: Record<string, unknown> = {
      shoppingCartId,
      total: Math.round(total),
      vat: Math.round(vat),
      typeOfCart: 'chargerInstallation',
      paymentMethod: 'transbank',
      status: 'pending',
      ...(email ? { customerId: email } : {}),
    }

    console.log('[payment] Creating ShoppingCart:', JSON.stringify(cartInput))

    const cartJson = await callAppSync(appsyncUrl, apiKey, CREATE_SHOPPING_CART, { input: cartInput }, 'createShoppingCart')
    const createdId = cartJson?.data?.createShoppingCart?.shoppingCartId

    if (!createdId) {
      const errMsg = cartJson?.errors?.map((e: any) => e.message).join('; ') ?? 'null response'
      throw new Error(`createShoppingCart returned no ID: ${errMsg}`)
    }

    console.log('[payment] ShoppingCart created:', createdId)

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[payment] createShoppingCart error:', message)
    return NextResponse.json({ error: `createShoppingCart failed: ${message}`, shoppingCartId }, { status: 502 })
  }

  // ── Step 2: Create ShoppingCartDetail (Lambda may require at least one item) ─
  try {
    const detailInput = {
      shoppingCartDetailId: crypto.randomUUID(),
      shoppingCartId,
      glosa: chargerName,
      price: Math.round(total),
      typeOfItem: 'service',
    }

    console.log('[payment] Creating ShoppingCartDetail:', JSON.stringify(detailInput))

    const detailJson = await callAppSync(appsyncUrl, apiKey, CREATE_SHOPPING_CART_DETAIL, { input: detailInput }, 'createShoppingCartDetail')
    console.log('[payment] ShoppingCartDetail created:', detailJson?.data?.createShoppingCartDetail?.shoppingCartDetailId)
  } catch (err: unknown) {
    // Non-fatal — log but continue to WebpayStart
    console.warn('[payment] createShoppingCartDetail error (non-fatal):', err instanceof Error ? err.message : err)
  }

  // ── Step 3: WebpayStart ───────────────────────────────────────────────────────
  try {
    console.log(`[payment] Calling WebpayStart — cartId=${shoppingCartId}, glosa="${glosa}"`)

    const webpayJson = await callAppSync(appsyncUrl, apiKey, WEBPAY_START, { shoppingCartId, glosa }, 'WebpayStart')
    const result = webpayJson?.data?.WebpayStart

    console.log('[payment] WebpayStart result:', JSON.stringify(result))

    if (!result?.token) {
      const appSyncErrors = webpayJson?.errors?.map((e: any) => e.message).join('; ')
      throw new Error(
        appSyncErrors
          ? `AppSync errors: ${appSyncErrors}`
          : `WebpayStart returned null — cart may not satisfy Lambda conditions (cartId: ${shoppingCartId})`
      )
    }

    console.log('[payment] Webpay token obtained, order:', result.order)

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
    console.error('[payment] WebpayStart error:', message)
    return NextResponse.json(
      { error: `WebpayStart failed: ${message}`, shoppingCartId },
      { status: 502 }
    )
  }
}
