// Tracker del cotizador. Sesión persistente via sessionStorage (GA4-style).

const ENDPOINT = '/api/track'
const UID_KEY = 'ec_uid'
const SID_KEY = 'ec_sid'
const FIRED_EVENTS_KEY = 'ec_fired_events'

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

// sessionId persiste en sessionStorage: sobrevive recargas y redirects Webpay.
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr-env'
  try {
    let sid = sessionStorage.getItem(SID_KEY)
    if (!sid) {
      sid = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem(SID_KEY, sid)
      // Nueva sesión: limpiar registro de eventos únicos
      sessionStorage.removeItem(FIRED_EVENTS_KEY)
    }
    return sid
  } catch {
    return 'fallback-sid'
  }
}

// anonymousId persistente en localStorage. Cache en memoria para evitar I/O repetido.
let cachedAnonymousId: string | null = null
function getAnonymousId(): string {
  if (typeof window === 'undefined') return 'ssr-env'
  if (cachedAnonymousId) return cachedAnonymousId
  try {
    const existing = localStorage.getItem(UID_KEY)
    if (existing) {
      cachedAnonymousId = existing
      return existing
    }
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2)
    localStorage.setItem(UID_KEY, id)
    cachedAnonymousId = id
    return id
  } catch {
    const sid = getSessionId()
    cachedAnonymousId = sid
    return sid
  }
}

function getDevice(): 'mobile' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'
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
    sessionId: getSessionId(),
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

// trackUnique: registra el evento solo una vez por sesión (deduplicación de hitos).
export function trackUnique(event: string, props: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  if (!event) return
  try {
    const raw = sessionStorage.getItem(FIRED_EVENTS_KEY)
    const fired: string[] = raw ? (JSON.parse(raw) as string[]) : []
    if (fired.includes(event)) return
    fired.push(event)
    sessionStorage.setItem(FIRED_EVENTS_KEY, JSON.stringify(fired))
    track(event, props)
  } catch {
    track(event, props)
  }
}
