import { NextRequest, NextResponse } from 'next/server'

// Server-side reverse geocode — API key has no browser/domain restrictions here
const GMAPS_KEY = 'AIzaSyBdAjJeBoZ8ehrL0byX2ZBHHtQSI6pfIvQ'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json({ error: 'lat and lng are required' }, { status: 400 })
  }

  const latNum = parseFloat(lat)
  const lngNum = parseFloat(lng)

  if (isNaN(latNum) || isNaN(lngNum)) {
    return NextResponse.json({ error: 'lat and lng must be numbers' }, { status: 400 })
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latNum},${lngNum}&key=${GMAPS_KEY}&language=es&region=cl`
    const res = await fetch(url, { cache: 'no-store' })
    const json = await res.json()

    const address = json.results?.[0]?.formatted_address ?? null

    return NextResponse.json({ address, status: json.status })
  } catch (err) {
    console.error('[/api/geocode] error:', err)
    return NextResponse.json({ error: 'Reverse geocode failed' }, { status: 502 })
  }
}
