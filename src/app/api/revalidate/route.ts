import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("prismic");

  // Non-blocking IndexNow ping
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

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
