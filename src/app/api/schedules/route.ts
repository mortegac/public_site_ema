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

// Returns json — logs truncated response; throws only on HTTP error
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
  console.log(`[schedules] ${label} raw response:`, JSON.stringify(json).slice(0, 500))

  if (json.errors?.length && !json.data) {
    throw new Error(`${label}: ${json.errors.map((e: any) => e.message).join('; ')}`)
  }

  return json
}

// ─── GraphQL query ────────────────────────────────────────────────────────────
const LIST_CALENDAR_VISITS = /* GraphQL */ `
  query listCalendarVisits($startDate: String!, $endDate: String!, $userId: ID!) {
    CalendarVisitsByState(
      state: available
      startDate: {between: [$startDate, $endDate]}
      sortDirection: ASC
      filter: {userId: {eq: $userId}}
    ) {
      items {
        calendarId
        startDate
        endDate
        summary
        location
        description
        timeZone
        duration
        state
        customerId
        userId
      }
    }
  }
`

// ─── Response type ─────────────────────────────────────────────────────────────
export interface CalendarSlot {
  calendarId: string
  startDate: string   // ISO datetime
  endDate: string     // ISO datetime
  summary: string
  location: string
  description: string
  timeZone: string
  duration: number
  state: string
  customerId: string | null
  userId: string
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const userId = searchParams.get('userId') ?? 'ariel.rivera@energica.city'

  // Default date range: today+2 → today+16
  let startDate: string
  let endDate: string

  const rawStart = searchParams.get('startDate')
  const rawEnd = searchParams.get('endDate')

  if (rawStart && rawEnd) {
    startDate = rawStart
    endDate = rawEnd
  } else {
    const start = new Date()
    start.setDate(start.getDate() + 2)
    start.setHours(0, 0, 0, 0)

    const end = new Date()
    end.setDate(end.getDate() + 16)
    end.setHours(23, 59, 59, 999)

    startDate = start.toISOString()
    endDate = end.toISOString()
  }

  console.log(`[schedules] Fetching slots — userId=${userId}, startDate=${startDate}, endDate=${endDate}`)

  try {
    const { url: appsyncUrl, apiKey } = getAppSyncConfig()

    const json = await callAppSync(
      appsyncUrl,
      apiKey,
      LIST_CALENDAR_VISITS,
      { startDate, endDate, userId },
      'listCalendarVisits'
    )

    const items: CalendarSlot[] = json?.data?.CalendarVisitsByState?.items ?? []
    console.log(`[schedules] Returning ${items.length} slots`)

    return NextResponse.json({ items })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[schedules] Error fetching calendar visits:', message)
    // Graceful degradation — never 5xx from this route
    return NextResponse.json({ items: [], error: message }, { status: 200 })
  }
}
