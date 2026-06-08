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
  query GetCustomer($customerId: ID!) {
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

  // ── Upsert Customer via the same robust pattern as /api/customer ─────────
  try {
    // Try CREATE first (will fail with ConditionalCheckFailed if already exists)
    const createInput = {
      customerId,
      name: name.trim(),
      phone: '-',
      address: address ?? '',
      city: '',
      state: '',
      zipCode: '',
      lat: '',
      long: '',
      referenceAddress: '',
      zoomLevel: '15',
    }
    await callAppSync(url, apiKey, CREATE_CUSTOMER, { input: createInput })
  } catch {
    // Customer already exists — UPDATE name (and address if provided)
    // Never overwrite with placeholder; only update fields with real values
    const updateInput: Record<string, unknown> = { customerId, name: name.trim() }
    if (address?.trim()) updateInput.address = address.trim()
    try {
      await callAppSync(url, apiKey, UPDATE_CUSTOMER, { input: updateInput })
    } catch (updateErr) {
      console.error('[send-quote-to-email] updateCustomer error:', updateErr)
    }
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
