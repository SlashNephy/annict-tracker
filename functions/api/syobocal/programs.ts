import { XMLParser } from 'fast-xml-parser'
import queryString from 'query-string'
import { z } from 'zod'

import { json } from '../../lib/response.ts'

import type { SyobocalProgramsResponse, SyobocalProgramsResult } from './programs.types.ts'

const schema = z.object({
  id: z.union([z.string().regex(/^\d+$/), z.array(z.string().regex(/^\d+$/))]),
})

// CORS 回避のため、Cloudflare Worker から fetch する API
export const onRequestGet: PagesFunction = async (context) => {
  const url = queryString.parseUrl(context.request.url, { arrayFormat: 'comma' })
  const query = await schema.safeParseAsync(url.query)

  if (!query.success) {
    return json(
      {
        success: false,
        error: query.error.toString(),
      } satisfies SyobocalProgramsResponse,
      { status: 400 }
    )
  }

  const ids = typeof query.data.id === 'string' ? [query.data.id] : query.data.id

  // TODO: Cookie でユーザーを確認する
  // TODO: キャッシュ

  try {
    return json({
      success: true,
      result: await lookupPrograms(ids),
    } satisfies SyobocalProgramsResponse)
  } catch (e: unknown) {
    console.error(`failed to fetch programs: ${e}`)

    return json(
      {
        success: false,
        error: 'failed to fetch programs',
      } satisfies SyobocalProgramsResponse,
      { status: 500 }
    )
  }
}

async function lookupPrograms(ids: string[]): Promise<SyobocalProgramsResult> {
  const params = new URLSearchParams({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Command: 'ProgLookup',
    TID: ids.join(','),
  }).toString()

  const response = await fetch(`https://cal.syoboi.jp/db.php?${params}`, {
    headers: {
      'User-Agent': 'annict-tracker-worker/1.0 (+https://github.com/SlashNephy/annict-tracker)',
    },
  })
  const text = await response.text()

  const parser = new XMLParser()
  return parser.parse(text)
}
