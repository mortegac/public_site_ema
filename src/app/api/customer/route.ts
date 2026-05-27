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
  variables: Record<string, unknown>
) {
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

const GET_CUSTOMER = /* GraphQL */ `
  query GetCustomer($customerId: String!) {
    getCustomer(customerId: $customerId) {
      customerId
    }
  }
`

const CREATE_CUSTOMER = /* GraphQL */ `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      customerId
    }
  }
`

const UPDATE_CUSTOMER = /* GraphQL */ `
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customerId
    }
  }
`

const UPDATE_CLIENT_FORM = /* GraphQL */ `
  mutation UpdateClientForm($input: UpdateClientFormInput!) {
    updateClientForm(input: $input) {
      formId
      customerId
    }
  }
`

interface CustomerBody {
  email: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  lat?: string
  lng?: string
  depto?: string
  typeOfResidence?: 'house' | 'appartment' | 'other'
  formId?: string | null
}

// Same normalization as src/store/Customer/services.ts
function normalizeEmail(value: string): string {
  return value
    .replace(/[\u200B-\u200D\uFEFF\u2060]/g, '')
    .replace(/\u00A0/g, ' ')
    .trim()
    .normalize('NFC')
    .toLowerCase()
}
export async function POST(req: NextRequest) {
  let body: CustomerBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, address, city, state, zipCode, lat, lng, depto, typeOfResidence, formId } = body

  if (!email?.trim()) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  const { url, apiKey } = getAppSyncConfig()
  const customerId = normalizeEmail(email)

  // ── Upsert Customer ────────────────────────────────────────────────────────
  try {
    const existing = await callAppSync(url, apiKey, GET_CUSTOMER, { customerId }).catch(() => null)

    if (existing?.getCustomer) {
      await callAppSync(url, apiKey, UPDATE_CUSTOMER, {
        input: {
          customerId,
          ...(address ? { address } : {}),
          ...(city ? { city } : {}),
          ...(state ? { state } : {}),
          ...(zipCode ? { zipCode } : {}),
          ...(lat ? { lat } : {}),
          ...(lng ? { long: lng } : {}),
          ...(depto !== undefined ? { referenceAddress: depto } : {}),
          ...(typeOfResidence ? { typeOfResidence } : {}),
        },
      }).catch(() => null)
    } else {
      await callAppSync(url, apiKey, CREATE_CUSTOMER, {
        input: {
          customerId,
          name: '-',
          phone: '-',
          address: address ?? '',
          city: city ?? '',
          state: state ?? '',
          zipCode: zipCode ?? '',
          lat: lat ?? '',
          long: lng ?? '',
          referenceAddress: depto ?? '',
          zoomLevel: '15',
          typeOfResidence: typeOfResidence ?? 'other',
        },
      })
    }
  } catch (err) {
    console.error('[customer] upsert error:', err)
    return NextResponse.json({ error: 'Failed to save customer' }, { status: 500 })
  }

  // ── Link ClientForm to Customer ────────────────────────────────────────────
  if (formId) {
    try {
      await callAppSync(url, apiKey, UPDATE_CLIENT_FORM, {
        input: { formId, customerId },
      })
    } catch (err) {
      console.error('[customer] updateClientForm error:', err)
    }
  }

  return NextResponse.json({ success: true, customerId })
}
