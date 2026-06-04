import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

function generateHS256JWT(payload: Record<string, unknown>, secret: string): string {
  const b64url = (obj: Record<string, unknown> | string) => {
    const str = typeof obj === 'string' ? obj : JSON.stringify(obj)
    return Buffer.from(str).toString('base64url')
  }
  const header = b64url({ alg: 'HS256', typ: 'JWT' })
  const body = b64url(payload)
  const sig = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${sig}`
}

export async function POST(req: NextRequest) {
  let body: { formId?: string; email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { formId, email } = body
  if (!formId || !email) {
    return NextResponse.json({ error: 'formId and email are required' }, { status: 400 })
  }

  const secret = process.env.JWT_SECRET ?? 'energica-city-jwt-secret'
  const payload = {
    sub: email,
    formid: formId,
    email,
    iat: Math.floor(Date.now() / 1000),
  }

  const token = generateHS256JWT(payload, secret)
  const url = `https://www.energica.city/cotizador/pago?${token}`

  return NextResponse.json({ url, token })
}
