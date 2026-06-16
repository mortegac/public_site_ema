// Tracker del cotizador. Estado de sesión a nivel de módulo (no exportado).

const ENDPOINT = '/api/track'
const UID_KEY = 'ec_uid'

export interface TrackPayload {
  event: string
  props: Record<string, unknown>
  sessionId: string
  anonymousId: string
  customerId?: string | null
  formId?: string | null
  url: string
  referrer: string
  device: 'mobile' | 'desktop'
  step?: number | null
  timestamp: string
  sourceUrl: string
}

// Un sessionId por carga de módulo (≈ por pestaña/recarga).
const sessionId =
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

// anonymousId persistente en localStorage. Lazy-init.
let cachedAnonymousId: string | null = null
function getAnonymousId(): string {
  if (cachedAnonymousId) return cachedAnonymousId
  try {
    const existing = localStorage.getItem(UID_KEY)
    if (existing) {
      cachedAnonymousId = existing
    } else {
      const id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2)
      localStorage.setItem(UID_KEY, id)
      cachedAnonymousId = id
    }
  } catch {
    cachedAnonymousId = sessionId
  }
  return cachedAnonymousId
}

function getDevice(): 'mobile' | 'desktop' {
  return /Mobi/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
}

let identity: { customerId?: string | null; formId?: string | null } = {}

export function setTrackerIdentity(
  next: { customerId?: string | null; formId?: string | null }
): void {
  identity = { ...identity, ...next }
}

export function track(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  if (!event) return

  const payload: TrackPayload = {
    event,
    props,
    sessionId,
    anonymousId: getAnonymousId(),
    customerId: identity.customerId ?? null,
    formId: identity.formId ?? null,
    url: window.location.pathname,
    referrer: document.referrer,
    device: getDevice(),
    step: typeof props.step === 'number' ? (props.step as number) : null,
    timestamp: new Date().toISOString(),
    sourceUrl: 'ENERGICA',
  }

  const data = JSON.stringify(payload)

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: 'application/json' })
      if (navigator.sendBeacon(ENDPOINT, blob)) return
    }
  } catch { /* fallback to fetch */ }

  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    keepalive: true,
  }).catch(() => { /* tracking never breaks UX */ })
}
