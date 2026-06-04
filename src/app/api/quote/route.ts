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

// ─── GraphQL queries ──────────────────────────────────────────────────────────
const GET_CLIENT_FORM_WITH_ESTIMATES = /* GraphQL */ `
  query GetClientFormWithEstimates($formId: ID!) {
    getClientForm(formId: $formId) {
      formId
      isHouse
      isWallbox
      isPortable
      distance
      customerId
      Estimates {
        items {
          estimateId
          materialsCost
          installationCost
          TE6Cost
          netCost
          vat
          totalInstallationGross
          chargerCost
          chargerBrand
          chargerModel
          chargerPotence
          distanceExposed
          createdAt
        }
      }
    }
  }
`

const GET_CUSTOMER = /* GraphQL */ `
  query GetCustomer($customerId: ID!) {
    getCustomer(customerId: $customerId) {
      customerId
      name
      phone
      address
      typeOfResidence
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
      }
    }
  }
`

// ─── Charger name helper ──────────────────────────────────────────────────────
function deriveChargerName(
  chargerBrand: string | null,
  chargerModel: string | null,
  chargerCost: number,
  chargerPotence: number | null
): string {
  if (chargerCost === 0) return 'Ya tiene cargador'
  const label = [chargerBrand, chargerModel].filter(Boolean).join(' ').trim()
  if (label) return label
  if (chargerPotence != null) {
    if (chargerPotence >= 7) return `Wallbox ${chargerPotence} kW`
    return `Portátil ${chargerPotence} kW`
  }
  return 'Cargador EV'
}

// ─── Output type ─────────────────────────────────────────────────────────────
export interface QuoteResponse {
  formId: string
  tipo: 'casa' | 'edificio'
  chargerName: string
  dist: number
  mat: number
  inst: number
  sec: number
  chargerPrice: number
  neto: number
  iva: number
  total: number
  isOwn: boolean
  address: string
  nextVisitDate: string | null
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const formId = req.nextUrl.searchParams.get('formId')?.trim()

  if (!formId) {
    return NextResponse.json({ error: 'formId query param is required' }, { status: 400 })
  }

  const { url, apiKey } = getAppSyncConfig()

  // ── Fetch ClientForm + Estimates ─────────────────────────────────────────
  let form: any
  try {
    const data = await callAppSync(url, apiKey, GET_CLIENT_FORM_WITH_ESTIMATES, { formId })
    form = data?.getClientForm
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/quote] getClientForm error:', message)
    return NextResponse.json({ error: `Failed to fetch form: ${message}` }, { status: 502 })
  }

  if (!form) {
    return NextResponse.json({ error: 'No quote found for this formId' }, { status: 404 })
  }

  // ── Resolve estimate — use stored if available, otherwise recompute ───────
  const storedEstimates: any[] = form.Estimates?.items ?? []
  const validStored = storedEstimates.filter((e: any) => e?.totalInstallationGross != null && e.totalInstallationGross > 0)
  validStored.sort((a: any, b: any) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))

  let estimate: any = validStored[0] ?? null
  let fromLambda = false

  if (!estimate) {
    // Self-heal: re-run ProcessEstimate
    try {
      const recomputed = await callAppSync(url, apiKey, PROCESS_ESTIMATE, { formId })
      const lambdaEstimates: any[] = recomputed?.ProcessEstimate?.estimates ?? []
      if (lambdaEstimates.length > 0) {
        // Map Lambda response fields to the unified shape
        const le = lambdaEstimates[0]
        estimate = {
          materialsCost: le.materialsCost,
          installationCost: le.installationCost,
          TE6Cost: le.SECCost,
          chargerCost: le.referenceChargerPrice,
          netCost: le.netPrice,
          vat: le.VAT,
          totalInstallationGross: le.grossPrice,
          chargerPotence: le.chargerPotence,
          chargerBrand: null,
          chargerModel: null,
          distanceExposed: null,
        }
        fromLambda = true
      }
    } catch (err) {
      console.error('[/api/quote] ProcessEstimate recompute error:', err)
    }

    if (!estimate) {
      return NextResponse.json({ error: 'No estimate available for this form' }, { status: 404 })
    }
  }

  // ── Fetch Customer address + next visit (parallel) ────────────────────────
  const startDate = new Date()
  startDate.setDate(startDate.getDate() + 1)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 30)
  endDate.setHours(23, 59, 59, 999)

  const [customerData, calendarData] = await Promise.all([
    form.customerId
      ? callAppSync(url, apiKey, GET_CUSTOMER, { customerId: form.customerId }).catch(() => null)
      : Promise.resolve(null),
    callAppSync(url, apiKey, LIST_NEXT_AVAILABLE, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }).catch(() => null),
  ])

  const customer = customerData?.getCustomer ?? null
  const nextVisitDate: string | null = calendarData?.CalendarVisitsByState?.items?.[0]?.startDate ?? null

  // ── Map to response shape ─────────────────────────────────────────────────
  const chargerCost = Number(estimate.chargerCost ?? 0)
  const response: QuoteResponse = {
    formId: form.formId,
    tipo: form.isHouse ? 'casa' : 'edificio',
    chargerName: deriveChargerName(
      estimate.chargerBrand ?? null,
      estimate.chargerModel ?? null,
      chargerCost,
      estimate.chargerPotence ?? null
    ),
    dist: Number(estimate.distanceExposed ?? form.distance ?? 10),
    mat: Number(estimate.materialsCost ?? 0),
    inst: Number(estimate.installationCost ?? 0),
    sec: Number(estimate.TE6Cost ?? 0),
    chargerPrice: chargerCost,
    neto: Number(estimate.netCost ?? 0),
    iva: Number(estimate.vat ?? 0),
    total: Number(estimate.totalInstallationGross ?? 0),
    isOwn: chargerCost === 0,
    address: customer?.address ?? '',
    nextVisitDate,
  }

  console.log(`[/api/quote] formId=${formId} fromLambda=${fromLambda} total=${response.total}`)

  return NextResponse.json(response)
}
