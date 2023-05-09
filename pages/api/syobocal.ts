import { XMLParser } from 'fast-xml-parser'

import { MemoryCache } from '../../lib/MemoryCache'

import type { NextApiHandler } from 'next'

export type SyobocalRequest = Record<string, string>
type SyobocalResponse =
  | {
      error: string
    }
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | unknown

const cache = new MemoryCache()

const handler: NextApiHandler<SyobocalResponse> = async (req, res) => {
  console.log(`${req.method} ${req.url} <- ${JSON.stringify(req.body)}`)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const params = new URLSearchParams(req.body as SyobocalRequest).toString()
  const c = cache.get(params)
  if (c !== null) {
    res.status(200).json(c)
    return
  }

  const url = `https://cal.syoboi.jp/db.php?${params}`
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'annict-tracker/1.0 (+https://github.com/SlashNephy/annict-tracker)',
    },
  })
  const text = await response.text()
  const result = new XMLParser().parse(text)
  cache.set(params, result, { days: 1 })
  res.status(200).json(result)
}

// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#edge-api-routes
export const config = { runtime: 'edge' }

export default handler
