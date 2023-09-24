import { hoursToMilliseconds } from 'date-fns'
import queryString from 'query-string'
import { z } from 'zod'

import { json } from '../../lib/response.ts'
import { lookupPrograms, parseSyobocalProgramsResponse } from '../../lib/syobocal.ts'

import type { SyobocalProgramsResponse } from './programs.types.ts'

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
    const response = await lookupPrograms(ids)
    if (response.ProgLookupResponse.Result.Code !== 200) {
      throw new Error(`invalid response: ${response.ProgLookupResponse.Result.Message}`)
    }

    return json(
      {
        success: true,
        result: parseSyobocalProgramsResponse(response).sort((p) => p.startAt),
      } satisfies SyobocalProgramsResponse,
      {
        headers: {
          'Cache-Control': `max-age=${hoursToMilliseconds(6)} stale-while-revalidate=${hoursToMilliseconds(2)}`,
        },
      }
    )
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
