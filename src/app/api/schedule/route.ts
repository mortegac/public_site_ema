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

// ─── GraphQL mutation ─────────────────────────────────────────────────────────
const MAKE_RESERVATION_AND_CART = /* GraphQL */ `
  mutation MakeReservationAndCart($customerId: String!, $calendarId: String!) {
    MakeReservationAndCart(customerId: $customerId, calendarId: $calendarId) {
      message
      cartId
    }
  }
`

// ─── Request body schema ──────────────────────────────────────────────────────
interface ScheduleBody {
  customerId: string  // email of the user
  calendarId: string  // ID of the selected CalendarVisit slot
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: ScheduleBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { customerId, calendarId } = body

  if (!customerId || !calendarId) {
    return NextResponse.json(
      { error: 'customerId and calendarId are required' },
      { status: 400 }
    )
  }

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()

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
