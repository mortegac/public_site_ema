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

interface QuoteBody {
  formId?: string
  email?: string
  tipo?: string
  dist?: number
  mat?: number
  inst?: number
  sec?: number
  chargerPrice?: number
  chargerName?: string
  neto?: number
  iva?: number
  total?: number
  isOwn?: boolean
}

export async function POST(req: NextRequest) {
  let body: QuoteBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { formId, email, tipo, dist, mat, inst, sec, chargerPrice, chargerName, neto, iva, total, isOwn } = body
  if (!formId || !email) {
    return NextResponse.json({ error: 'formId and email are required' }, { status: 400 })
  }

  const secret = process.env.JWT_SECRET ?? 'energica-city-jwt-secret'
  const payload: Record<string, unknown> = {
    sub: email,
    formid: formId,
    email,
    iat: Math.floor(Date.now() / 1000),
  }

  // Embed quote amounts so the payment page shows exact same values as the email
  if (total != null) {
    payload.tipo = tipo ?? null
    payload.dist = dist ?? null
    payload.mat = mat ?? 0
    payload.inst = inst ?? 0
    payload.sec = sec ?? 0
    payload.chargerPrice = chargerPrice ?? 0
    payload.chargerName = chargerName ?? ''
    payload.neto = neto ?? 0
    payload.iva = iva ?? 0
    payload.total = total
    payload.isOwn = isOwn ?? false
  }

  const token = generateHS256JWT(payload, secret)
  const url = `https://www.energica.city/cotizador/pago?${token}`

  return NextResponse.json({ url, token })
}
