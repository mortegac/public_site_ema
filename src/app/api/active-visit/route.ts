import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

async function callAppSync(url: string, apiKey: string, query: string, variables: Record<string, unknown>) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}`)
  const json = await res.json()
  if (json.errors?.length && !json.data) throw new Error(json.errors.map((e: any) => e.message).join('; '))
  return json.data
}

// States that represent an active/confirmed booking (not available, not stale)
const ACTIVE_STATES = new Set(['reserved', 'payed', 'payedAndAgended', 'waiting'])

const GET_FORM_WITH_VISITS = /* GraphQL */ `
  query GetFormWithVisits($formId: ID!) {
    getClientForm(formId: $formId) {
      formId
      CalendarVisits {
        items {
          calendarId
          startDate
          endDate
          summary
          location
          state
        }
      }
    }
  }
`

const LIST_VISITS_BY_CUSTOMER = /* GraphQL */ `
  query ListVisitsByCustomer($customerId: ID!) {
    listCalendarVisits(
      filter: { customerId: { eq: $customerId } }
      limit: 20
    ) {
      items {
        calendarId
        startDate
        endDate
        summary
        location
        state
        customerId
      }
    }
  }
`

export interface ActiveVisit {
  calendarId: string
  startDate: string
  endDate: string | null
  summary: string | null
  location: string | null
  state: string
}

export async function GET(req: NextRequest) {
  const formId = req.nextUrl.searchParams.get('formId')?.trim()
  const customerId = req.nextUrl.searchParams.get('customerId')?.trim()

  if (!formId && !customerId) {
    return NextResponse.json({ error: 'formId or customerId query param is required' }, { status: 400 })
  }

  const { url, apiKey } = getAppSyncConfig()

  // Path 1: query by formId (more precise)
  if (formId) {
    try {
      const data = await callAppSync(url, apiKey, GET_FORM_WITH_VISITS, { formId })
      const items: any[] = data?.getClientForm?.CalendarVisits?.items ?? []
      const active = items
        .filter(v => ACTIVE_STATES.has(v.state))
        .sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))

      if (active.length > 0) {
        const visit = active[0]
        const result: ActiveVisit = {
          calendarId: visit.calendarId,
          startDate: visit.startDate,
          endDate: visit.endDate ?? null,
          summary: visit.summary ?? null,
          location: visit.location ?? null,
          state: visit.state,
        }
        console.log(`[/api/active-visit] formId=${formId} → found visit ${visit.calendarId} state=${visit.state}`)
        return NextResponse.json({ visit: result })
      }
    } catch (err) {
      console.error('[/api/active-visit] getClientForm query error (falling back to customerId):', err)
    }
  }

  // Path 2: fallback to customerId
  if (!customerId) {
    return NextResponse.json({ visit: null })
  }

  try {
    const data = await callAppSync(url, apiKey, LIST_VISITS_BY_CUSTOMER, { customerId })
    const items: any[] = data?.listCalendarVisits?.items ?? []

    // Filter for active states and pick the most recent one
    const active = items
      .filter(v => ACTIVE_STATES.has(v.state))
      .sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))

    if (active.length === 0) {
      return NextResponse.json({ visit: null })
    }

    const visit = active[0]
    const result: ActiveVisit = {
      calendarId: visit.calendarId,
      startDate: visit.startDate,
      endDate: visit.endDate ?? null,
      summary: visit.summary ?? null,
      location: visit.location ?? null,
      state: visit.state,
    }

    console.log(`[/api/active-visit] customerId=${customerId} → found visit ${visit.calendarId} state=${visit.state}`)
    return NextResponse.json({ visit: result })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/active-visit] error:', message)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
