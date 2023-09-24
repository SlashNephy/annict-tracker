import { hoursToMilliseconds } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import queryString from 'query-string'
import { z } from 'zod'

import { verifyJwt } from '../../lib/jwt.ts'
import { json } from '../../lib/response.ts'
import { lookupPrograms, parseSyobocalProgramsResponse } from '../../lib/syobocal.ts'

import type { SyobocalProgramsResponse } from './programs.types.ts'
import type { Env } from '../../env.ts'

const schema = z.object({
  id: z.union([z.string().regex(/^\d+$/), z.array(z.string().regex(/^\d+$/))]),
})

// CORS 回避のため、Cloudflare Worker から fetch する API
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = queryString.parseUrl(context.request.url, { arrayFormat: 'comma' })
  const query = await schema.safeParseAsync(url.query)

  if (!query.success) {
    return json<SyobocalProgramsResponse>(
      {
        success: false,
        error: query.error.toString(),
      },
      { status: StatusCodes.BAD_REQUEST }
    )
  }

  const jwt = await verifyJwt(context.request.headers, context.env)
  if (!jwt) {
    return json<SyobocalProgramsResponse>(
      {
        success: false,
        error: 'unauthorized',
      },
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  const ids = typeof query.data.id === 'string' ? [query.data.id] : query.data.id
  // TODO: キャッシュ

  try {
    const response = await lookupPrograms(ids)
    if (response.ProgLookupResponse.Result.Code !== 200) {
      throw new Error(`invalid response: ${response.ProgLookupResponse.Result.Message}`)
    }

    return json<SyobocalProgramsResponse>(
      {
        success: true,
        result: parseSyobocalProgramsResponse(response).sort((p) => p.startAt),
      },
      {
        headers: {
          'Cache-Control': `max-age=${hoursToMilliseconds(6)} stale-while-revalidate=${hoursToMilliseconds(2)}`,
        },
      }
    )
  } catch (e: unknown) {
    console.error(`failed to fetch programs: ${e}`)

    return json<SyobocalProgramsResponse>(
      {
        success: false,
        error: 'failed to fetch programs',
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
