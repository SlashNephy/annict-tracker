import { hoursToMilliseconds } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import queryString from 'query-string'
import { z } from 'zod'

import { verifyJwt } from '../../lib/jwt.ts'
import { lookupPrograms, parseSyobocalProgramsResponse } from '../../lib/syobocal.ts'

import type { SyobocalProgramsResponse } from './programs.types.ts'
import type { Env } from '../../env.ts'

const schema = z.object({
  id: z.string().regex(/^\d+$/),
})

// CORS 回避のため、Cloudflare Worker から fetch する API
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = queryString.parseUrl(context.request.url, { arrayFormat: 'comma' })
  const query = await schema.safeParseAsync(url.query)

  if (!query.success) {
    return Response.json(
      {
        success: false,
        error: query.error.toString(),
      } satisfies SyobocalProgramsResponse,
      { status: StatusCodes.BAD_REQUEST }
    )
  }

  const jwt = await verifyJwt(context.request, context.env)
  if (!jwt) {
    return Response.json(
      {
        success: false,
        error: 'unauthorized',
      } satisfies SyobocalProgramsResponse,
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  // TODO: キャッシュ

  try {
    const response = await lookupPrograms(query.data.id)
    if (response.ProgLookupResponse.Result.Code !== 200) {
      throw new Error(`invalid response: ${response.ProgLookupResponse.Result.Message}`)
    }

    return Response.json(
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

    return Response.json(
      {
        success: false,
        error: 'failed to fetch programs',
      } satisfies SyobocalProgramsResponse,
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
