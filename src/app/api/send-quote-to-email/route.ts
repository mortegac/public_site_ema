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
  if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join('; '))
  return json.data
}

const GET_CUSTOMER = /* GraphQL */ `
  query GetCustomer($customerId: String!) {
    getCustomer(customerId: $customerId) {
      customerId
      name
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

interface SendQuoteBody {
  name: string
  email: string
  formId?: string | null
  address?: string
}

export async function POST(req: NextRequest) {
  let body: SendQuoteBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, formId, address } = body

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
  }

  const { url, apiKey } = getAppSyncConfig()
  const customerId = email.trim().toLowerCase()

  // ── Create or update Customer ─────────────────────────────────────────────
  try {
    const existing = await callAppSync(url, apiKey, GET_CUSTOMER, { customerId }).catch(() => null)

    if (existing?.getCustomer) {
      await callAppSync(url, apiKey, UPDATE_CUSTOMER, {
        input: { customerId, name: name.trim(), ...(address ? { address } : {}) },
      }).catch(() => null)
    } else {
      await callAppSync(url, apiKey, CREATE_CUSTOMER, {
        input: {
          customerId,
          name: name.trim(),
          phone: '',
          address: address ?? '',
          city: '',
          state: '',
          zipCode: '',
          lat: '',
          long: '',
          referenceAddress: '',
          zoomLevel: '15',
          numberOfSuccessfulVisits: 0,
        },
      })
    }
  } catch (err) {
    console.error('[send-quote-to-email] customer upsert error:', err)
  }

  // ── Link ClientForm to Customer ───────────────────────────────────────────
  if (formId) {
    try {
      await callAppSync(url, apiKey, UPDATE_CLIENT_FORM, {
        input: { formId, customerId },
      })
    } catch (err) {
      console.error('[send-quote-to-email] updateClientForm error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
