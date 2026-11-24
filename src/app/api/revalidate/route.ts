import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  const secret = process.env.PRISMIC_WEBHOOK_SECRET;
  if (!secret || payload?.secret !== secret) {
    return NextResponse.json({ revalidated: false, error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("prismic");

  // Non-blocking IndexNow ping — solo en publicaciones reales, no en test-trigger
  if (payload?.type === "api-update") {
    fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'www.energica.city',
        key: 'b524f029908549c6bd7238b5d7b3c9cf',
        keyLocation: 'https://www.energica.city/b524f029908549c6bd7238b5d7b3c9cf.txt',
        urlList: ['https://www.energica.city/'],
      }),
    }).catch(() => {}) // non-blocking, ignore errors
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
