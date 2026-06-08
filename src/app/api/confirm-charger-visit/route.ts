import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

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
  console.log(`[confirm-charger-visit] ${label} raw response:`, JSON.stringify(json).slice(0, 600))

  if (json.errors?.length && !json.data) {
    throw new Error(`${label}: ${json.errors.map((e: any) => e.message).join('; ')}`)
  }

  return json
}

const CONFIRM_CHARGER_VISIT = /* GraphQL */ `
  mutation ConfirmChargerVisit(
    $calendarId: String!
    $customerId: String!
    $address: String
    $chargerName: String
  ) {
    ConfirmChargerVisit(
      calendarId: $calendarId
      customerId: $customerId
      address: $address
      chargerName: $chargerName
    ) {
      message
      calendarId
    }
  }
`

const UPDATE_CALENDAR_VISIT_FORMID = /* GraphQL */ `
  mutation UpdateCalendarVisitFormId($input: UpdateCalendarVisitInput!) {
    updateCalendarVisit(input: $input) {
      calendarId
      formId
    }
  }
`

const UPDATE_SHOPPING_CART_FORMID = /* GraphQL */ `
  mutation UpdateShoppingCartFormId($input: UpdateShoppingCartInput!) {
    updateShoppingCart(input: $input) {
      shoppingCartId
      formId
    }
  }
`

interface ConfirmBody {
  calendarId: string
  customerId: string
  address?: string
  chargerName?: string
  formId?: string
  shoppingCartId?: string
}

export async function POST(req: NextRequest) {
  let body: ConfirmBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { calendarId, customerId, address, chargerName, formId, shoppingCartId } = body

  if (!calendarId || !customerId) {
    return NextResponse.json({ error: 'calendarId and customerId are required' }, { status: 400 })
  }

  console.log(`[confirm-charger-visit] calendarId=${calendarId}, customerId=${customerId}`)

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()

  try {
    const json = await callAppSync(
      appsyncUrl,
      apiKey,
      CONFIRM_CHARGER_VISIT,
      { calendarId, customerId, address: address ?? '', chargerName: chargerName ?? 'Instalación cargador EV' },
      'ConfirmChargerVisit'
    )

    const result = json?.data?.ConfirmChargerVisit
    console.log('[confirm-charger-visit] result:', JSON.stringify(result))

    if (!result?.calendarId) {
      return NextResponse.json({ error: result?.message ?? 'Booking failed' }, { status: 502 })
    }

    // Best-effort: associate formId with CalendarVisit and ShoppingCart.
    // Failures here are logged but do NOT affect the booking response.
    if (formId) {
      callAppSync(appsyncUrl, apiKey, UPDATE_CALENDAR_VISIT_FORMID, {
        input: { calendarId: result.calendarId, formId },
      }, 'updateCalendarVisitFormId').catch(err =>
        console.error('[confirm-charger-visit] updateCalendarVisit formId failed (non-critical):', err)
      )

      if (shoppingCartId) {
        callAppSync(appsyncUrl, apiKey, UPDATE_SHOPPING_CART_FORMID, {
          input: { shoppingCartId, formId },
        }, 'updateShoppingCartFormId').catch(err =>
          console.error('[confirm-charger-visit] updateShoppingCart formId failed (non-critical):', err)
        )
      }
    }

    return NextResponse.json({ message: result.message, calendarId: result.calendarId })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[confirm-charger-visit] error:', message)
    return NextResponse.json({ error: `ConfirmChargerVisit failed: ${message}` }, { status: 502 })
  }
}
