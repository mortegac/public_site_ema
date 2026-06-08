import { NextRequest, NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'
import type { ClientFormStep } from '@/utils/client-form-steps'

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

const UPDATE_CLIENT_FORM_STEP = /* GraphQL */ `
  mutation UpdateClientFormStep($input: UpdateClientFormInput!) {
    updateClientForm(input: $input) {
      formId
      currentStep
    }
  }
`

interface UpdateStepBody {
  formId: string
  step: ClientFormStep
}

export async function POST(req: NextRequest) {
  let body: UpdateStepBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { formId, step } = body
  if (!formId?.trim() || !step) {
    return NextResponse.json({ error: 'formId and step are required' }, { status: 400 })
  }

  const { url, apiKey } = getAppSyncConfig()
  try {
    await callAppSync(url, apiKey, UPDATE_CLIENT_FORM_STEP, {
      input: { formId, currentStep: step },
    })
    console.log(`[/api/update-step] formId=${formId} → step=${step}`)
    return NextResponse.json({ success: true, formId, step })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[/api/update-step] error:', message)
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
