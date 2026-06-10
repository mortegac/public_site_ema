import { NextResponse } from 'next/server'
import amplifyOutputsProd from '../../../../amplify_outputs.json'
import amplifyOutputsDev from '../../../../amplify_outputs_dev.json'

function getAppSyncConfig() {
  const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT !== 'DEV'
  const outputs = isProd ? amplifyOutputsProd : amplifyOutputsDev
  const data = (outputs as any).data
  return { url: data.url as string, apiKey: data.api_key as string }
}

async function callAppSync(url: string, apiKey: string, query: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
    body: JSON.stringify({ query }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`AppSync HTTP ${res.status}: ${await res.text()}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join('; '))
  return json.data
}

const LIST_CHARGERS = /* GraphQL */ `
  query LISTA_PRODUCTOS22 {
    listProducts(filter: { type: { eq: "charger" } }) {
      items {
        productId
        description
        brand
        potence
        type
        stock
        Prices {
          items {
            priceId
            productId
            cost
            status
          }
        }
      }
    }
  }
`

export async function GET() {
  try {
    const { url, apiKey } = getAppSyncConfig()
    const data = await callAppSync(url, apiKey, LIST_CHARGERS)

    const items: any[] = data?.listProducts?.items ?? []

    const chargers = items
      .map((item: any) => {
        const desc: string = item.description ?? ''
        const tipo: 'portable' | 'wallbox' =
          item.productId === '4e9dcab3-e08d-4648-834a-0bc982cb14b5' ? 'portable' : 'wallbox'
        const potence: string = item.potence != null ? String(item.potence) : ''
        const name = `${item.brand ?? ''} ${potence} kW`.trim()

        const prices: any[] = item.Prices?.items ?? []
        const activePrice =
          prices.find((p: any) => p.status === 'ACTIVE') ??
          prices.find((p: any) => p.status === 'active') ??
          prices[0]
        const precio: number = activePrice?.cost ?? 0

        return {
          id: item.productId as string,
          name,
          tipo,
          kw: potence,
          desc,
          precio,
          stock: (item.stock as number) ?? 0,
        }
      })
      .filter((c) => c.precio > 0)

    return NextResponse.json({ chargers })
  } catch (error: any) {
    console.error('[api/charger] error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
