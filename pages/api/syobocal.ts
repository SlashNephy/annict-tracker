import { XMLParser } from 'fast-xml-parser'

import type { NextApiHandler } from 'next'

export type SyobocalRequest = Record<string, string>
type SyobocalResponse =
  | {
      error: string
    }
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | unknown

const handler: NextApiHandler<SyobocalResponse> = async (req, res) => {
  console.log(`${req.method} ${req.url} <- ${JSON.stringify(req.body)}`)

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' })
    return
  }

  const params = new URLSearchParams(req.body as SyobocalRequest)
  const url = `https://cal.syoboi.jp/db.php?${params}`

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'annict-tracker/1.0 (+https://github.com/SlashNephy/annict-tracker)',
    },
  })
  const text = await response.text()
  const result = new XMLParser().parse(text)
  res.status(200).json(result)
}

export default handler
