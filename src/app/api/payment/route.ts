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
  formId?: string
  typeOfCart?: 'chargerInstallation' | 'visit' | 'product' | 'service' | 'input' | 'virtualVisit'
  typeOfItem?: 'chargerInstallation' | 'visit' | 'product' | 'service' | 'input' | 'virtualVisit'
  pendingAmount?: number
  pendingGlosa?: string
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
    formId,
    typeOfCart = 'chargerInstallation',
    typeOfItem = 'chargerInstallation',
  } = body

  if (!total || total <= 0) {
    return NextResponse.json({ error: 'total must be a positive number' }, { status: 400 })
  }

  // TEST PAGOS ─ Fuerza el monto a $6 CLP para pruebas de Webpay.
  const isTestMode = true // TEST PAGOS
  const effectiveTotal = isTestMode ? 6 : Math.round(total) // TEST PAGOS
  const effectiveVat   = isTestMode ? 1 : Math.round(vat)   // TEST PAGOS
  if (isTestMode) {
    console.warn('[payment] ⚠️  TEST PAGOS ACTIVO: monto forzado a $6 CLP (original: $' + total + ')') // TEST PAGOS
  }
  // TEST PAGOS ─ Fin del bloque de prueba. ─────────────────────────────────────

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()
  const shoppingCartId = crypto.randomUUID()

  console.log(`[payment] Starting payment flow — total=${effectiveTotal}, cartId=${shoppingCartId}`)
  console.log(`[payment] email=${email ?? 'NOT_PROVIDED'}, typeOfCart=chargerInstallation`)

  // ── Step 1: Create ShoppingCart ──────────────────────────────────────────────
  try {
    const cartInput: Record<string, unknown> = {
      shoppingCartId,
      total: effectiveTotal,
      vat: effectiveVat,
      typeOfCart,
      paymentMethod: 'transbank',
      status: 'pending',
      ...(email ? { customerId: email } : {}),
      ...(formId ? { formId } : {}),
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

  // ── Step 1b: Create deferred ShoppingCart (pending balance) ─────────────────
  if (body.pendingAmount && body.pendingAmount > 0) {
    try {
      const pendingCartId = crypto.randomUUID()
      const pendingCartInput: Record<string, unknown> = {
        shoppingCartId: pendingCartId,
        total: Math.round(body.pendingAmount),
        vat: Math.round(body.pendingAmount * 0.19 / 1.19),
        typeOfCart: typeOfCart,
        paymentMethod: 'transbank',
        status: 'pending',
        ...(email ? { customerId: email } : {}),
        ...(formId ? { formId } : {}),
      }
      await callAppSync(appsyncUrl, apiKey, CREATE_SHOPPING_CART, { input: pendingCartInput }, 'createPendingShoppingCart')
      // Create detail for the deferred cart
      await callAppSync(appsyncUrl, apiKey, CREATE_SHOPPING_CART_DETAIL, {
        input: {
          shoppingCartDetailId: crypto.randomUUID(),
          shoppingCartId: pendingCartId,
          glosa: body.pendingGlosa ?? 'Saldo pendiente',
          price: Math.round(body.pendingAmount),
          typeOfItem: typeOfItem,
        }
      }, 'createPendingShoppingCartDetail')
      console.log('[payment] Deferred pending cart created:', pendingCartId)
    } catch (err: unknown) {
      console.warn('[payment] createPendingShoppingCart error (non-fatal):', err instanceof Error ? err.message : err)
    }
  }

  // ── Step 2: Create ShoppingCartDetail (Lambda may require at least one item) ─
  try {
    const detailGlosa = typeOfCart === 'visit'
      ? 'Visita técnica - kit aprobación de tu comunidad.'
      : (chargerName || glosa)
    const detailInput = {
      shoppingCartDetailId: crypto.randomUUID(),
      shoppingCartId,
      glosa: detailGlosa,
      price: effectiveTotal,
      typeOfItem,
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
