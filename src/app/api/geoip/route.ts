import { NextRequest, NextResponse } from 'next/server'

// IP-based geolocation fallback used when browser's native geolocation
// fails with POSITION_UNAVAILABLE (e.g., macOS CoreLocation failure).
// Returns approximate city/region so we can reverse-geocode to an address.

const SANTIAGO_FALLBACK = {
  latitude: -33.4489,
  longitude: -70.6693,
  city: 'Santiago',
  region: 'Región Metropolitana',
  country: 'Chile',
  source: 'fallback',
}

function getClientIp(req: NextRequest): string | null {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    null
  )
}

function isLocalhost(ip: string | null): boolean {
  if (!ip) return true
  return ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')
}

export async function GET(req: NextRequest) {
  const clientIp = getClientIp(req)

  // On localhost/dev, browser geo often fails — use Santiago default
  if (isLocalhost(clientIp)) {
    console.log('[geoip] Localhost detected — returning Santiago default')
    return NextResponse.json({ ...SANTIAGO_FALLBACK, source: 'localhost-default' })
  }

  try {
    // ipapi.co: free tier, no API key, 30k req/month
    const res = await fetch(`https://ipapi.co/${clientIp}/json/`, {
      headers: { 'User-Agent': 'energica.city/1.0' },
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`ipapi.co HTTP ${res.status}`)

    const data = await res.json()

    if (data.error) throw new Error(data.reason ?? 'ipapi.co error')

    return NextResponse.json({
      latitude: data.latitude ?? SANTIAGO_FALLBACK.latitude,
      longitude: data.longitude ?? SANTIAGO_FALLBACK.longitude,
      city: data.city ?? SANTIAGO_FALLBACK.city,
      region: data.region ?? SANTIAGO_FALLBACK.region,
      country: data.country_name ?? SANTIAGO_FALLBACK.country,
      source: 'ipapi',
    })
  } catch (err) {
    console.warn('[geoip] ipapi.co failed, using Santiago fallback:', err)
    return NextResponse.json({ ...SANTIAGO_FALLBACK, source: 'fallback' })
  }
}
