import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

// ─── AWS AppSync config resolved at request time ──────────────────────────────
function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return {
    url: data.url as string,
    apiKey: data.api_key as string,
  }
}

// ─── Generic AppSync caller ───────────────────────────────────────────────────
async function callAppSync(
  url: string,
  apiKey: string,
  query: string,
  variables: Record<string, unknown>
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({ query, variables }),
    // Server-side fetch — no CORS issue
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`AppSync HTTP ${res.status}: ${await res.text()}`)
  }

  const json = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join('; '))
  }

  return json.data
}

// ─── GraphQL mutations ────────────────────────────────────────────────────────
const CREATE_CLIENT_FORM = /* GraphQL */ `
  mutation ($input: CreateClientFormInput!) {
    createClientForm(input: $input) {
      formId
      isWallbox
      isPortable
      isHouse
      distance
      numberOfChargers
      customerId
      createdAt
      updatedAt
    }
  }
`

const PROCESS_ESTIMATE = /* GraphQL */ `
  mutation ProcessEstimate($formId: String!) {
    ProcessEstimate(formId: $formId) {
      message
      estimates {
        estimateId
        materialsCost
        installationCost
        SECCost
        referenceChargerPrice
        netPrice
        VAT
        grossPrice
        chargerPotence
      }
    }
  }
`

const LIST_NEXT_AVAILABLE = /* GraphQL */ `
  query ListNextAvailable($startDate: String!, $endDate: String!) {
    CalendarVisitsByState(
      state: available
      startDate: { between: [$startDate, $endDate] }
      sortDirection: ASC
      limit: 1
    ) {
      items {
        calendarId
        startDate
        userId
      }
    }
  }
`

// ─── Request body schema ──────────────────────────────────────────────────────
interface CotizarBody {
  isHouse: boolean
  isWallbox: boolean
  isPortable: boolean
  distance: number
  numberOfChargers?: number
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: CotizarBody

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { isHouse, isWallbox, isPortable, distance, numberOfChargers = 1 } = body

  if (typeof isHouse !== 'boolean' || typeof isWallbox !== 'boolean' || typeof isPortable !== 'boolean') {
    return NextResponse.json(
      { error: 'Missing required fields: isHouse, isWallbox, isPortable' },
      { status: 400 }
    )
  }

  const { url, apiKey } = getAppSyncConfig()

  // ── Step 1: createClientForm ────────────────────────────────────────────────
  let formId: string

  try {
    const formData = await callAppSync(url, apiKey, CREATE_CLIENT_FORM, {
      input: {
        formId: crypto.randomUUID(),
        isHouse,
        isWallbox,
        isPortable,
        distance: distance ?? 10,
        numberOfChargers,
        // omit customerId — DynamoDB GSI gsi-Customer.ClientForms expects String not NULL
      },
    })

    formId = formData?.createClientForm?.formId
    if (!formId) {
      throw new Error('createClientForm returned no formId')
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/cotizar] createClientForm error:', message)
    return NextResponse.json({ error: `createClientForm failed: ${message}` }, { status: 502 })
  }

  // ── Step 2: ProcessEstimate + next available date (parallel) ────────────────
  try {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + 1)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)
    endDate.setHours(23, 59, 59, 999)

    const [estimateData, calendarData] = await Promise.all([
      callAppSync(url, apiKey, PROCESS_ESTIMATE, { formId }),
      callAppSync(url, apiKey, LIST_NEXT_AVAILABLE, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }).catch(() => null),
    ])

    const result = estimateData?.ProcessEstimate
    const nextSlot = calendarData?.CalendarVisitsByState?.items?.[0]
    const nextAvailableDate: string | null = nextSlot?.startDate ?? null

    console.log('[/api/cotizar] nextAvailableDate:', nextAvailableDate)

    return NextResponse.json({
      formId,
      message: result?.message ?? 'ok',
      estimates: result?.estimates ?? [],
      nextAvailableDate,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/cotizar] ProcessEstimate error:', message)
    return NextResponse.json({ error: `ProcessEstimate failed: ${message}` }, { status: 502 })
  }
}
