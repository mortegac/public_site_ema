import { NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

export const runtime = 'nodejs'

function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

const CREATE_COTIZADOR_EVENT = /* GraphQL */ `
  mutation CreateCotizadorEvent($input: CreateCotizadorEventInput!) {
    createCotizadorEvent(input: $input) { eventId }
  }
`

function safeProps(raw: unknown): string | null {
  if (raw == null) return null
  try { return JSON.stringify(JSON.parse(JSON.stringify(raw))) }
  catch { return null }
}

function str(v: unknown): string | null {
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : null
}

function intOrNull(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? Math.trunc(v) : null
}

async function sendEvent(input: Record<string, unknown>) {
  const { url, apiKey } = getAppSyncConfig()
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query: CREATE_COTIZADOR_EVENT, variables: { input } }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.errors?.length && !json.data) throw new Error(json.errors.map((e: any) => e.message).join('; '))
}

export async function POST(req: Request) {
  let body: any
  try {
    body = await req.json()
  } catch {
    try { body = JSON.parse(await req.text()) } catch { body = null }
  }

  const event = str(body?.event)
  if (!event) return NextResponse.json({}, { status: 202 })

  const input: Record<string, unknown> = {
    eventId:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    event,
    sessionId: str(body?.sessionId) ?? 'unknown',
    anonymousId: str(body?.anonymousId) ?? 'unknown',
    customerId: str(body?.customerId),
    formId: str(body?.formId),
    props: safeProps(body?.props),
    url: str(body?.url),
    referrer: str(body?.referrer),
    device: str(body?.device),
    step: intOrNull(body?.step),
    createdAt: str(body?.timestamp) ?? new Date().toISOString(),
  }

  // Fire-and-forget: respond 202 before AppSync call
  void sendEvent(input).catch(err => console.error('[/api/track]', err.message))

  return NextResponse.json({}, { status: 202 })
}
