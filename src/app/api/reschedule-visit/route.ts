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
  console.log(`[reschedule-visit] ${label} raw:`, JSON.stringify(json).slice(0, 400))
  if (json.errors?.length && !json.data) {
    throw new Error(`${label}: ${json.errors.map((e: any) => e.message).join('; ')}`)
  }
  return json
}

const RELEASE_CALENDAR_VISIT = /* GraphQL */ `
  mutation ReleaseCalendarVisit($input: UpdateCalendarVisitInput!) {
    updateCalendarVisit(input: $input) {
      calendarId
      state
    }
  }
`

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

interface RescheduleBody {
  oldCalendarId: string
  newCalendarId: string
  customerId: string
  address?: string
  chargerName?: string
  formId?: string
}

export async function POST(req: NextRequest) {
  let body: RescheduleBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { oldCalendarId, newCalendarId, customerId, address, chargerName, formId } = body

  if (!oldCalendarId || !newCalendarId || !customerId) {
    return NextResponse.json(
      { error: 'oldCalendarId, newCalendarId and customerId are required' },
      { status: 400 }
    )
  }

  console.log(`[reschedule-visit] old=${oldCalendarId} new=${newCalendarId} customer=${customerId}`)

  const { url: appsyncUrl, apiKey } = getAppSyncConfig()

  // Step 1: Release old slot
  try {
    await callAppSync(
      appsyncUrl, apiKey,
      RELEASE_CALENDAR_VISIT,
      { input: { calendarId: oldCalendarId, state: 'available' } },
      'ReleaseOldSlot'
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[reschedule-visit] release old slot failed:', message)
    return NextResponse.json({ error: `Could not release old slot: ${message}` }, { status: 502 })
  }

  // Step 2: Reserve new slot
  try {
    const json = await callAppSync(
      appsyncUrl, apiKey,
      CONFIRM_CHARGER_VISIT,
      {
        calendarId: newCalendarId,
        customerId,
        address: address ?? '',
        chargerName: chargerName ?? 'Instalación cargador EV',
      },
      'ConfirmNewSlot'
    )

    const result = json?.data?.ConfirmChargerVisit
    if (!result?.calendarId) {
      // Attempt to re-reserve old slot (best-effort rollback)
      callAppSync(appsyncUrl, apiKey, CONFIRM_CHARGER_VISIT,
        { calendarId: oldCalendarId, customerId, address: address ?? '', chargerName: chargerName ?? '' },
        'RollbackOldSlot'
      ).catch(() => null)
      return NextResponse.json({ error: result?.message ?? 'New booking failed' }, { status: 502 })
    }

    // Best-effort: update formId on new slot
    if (formId) {
      callAppSync(appsyncUrl, apiKey, UPDATE_CALENDAR_VISIT_FORMID,
        { input: { calendarId: result.calendarId, formId } },
        'UpdateFormId'
      ).catch(err => console.error('[reschedule-visit] updateFormId failed (non-critical):', err))
    }

    return NextResponse.json({ ok: true, calendarId: result.calendarId, message: result.message })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[reschedule-visit] confirm new slot failed:', message)
    return NextResponse.json({ error: `New booking failed: ${message}` }, { status: 502 })
  }
}
