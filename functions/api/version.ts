import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'
import { StatusCodes } from 'http-status-codes'

import { verifyJwt } from '../lib/jwt.ts'
import { json } from '../lib/response.ts'

import type { VersionResponse } from './version.types.ts'
import type { Env } from '../env.ts'

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const jwt = await verifyJwt(context.request.headers, context.env)
  if (!jwt) {
    return json<VersionResponse>(
      {
        success: false,
        error: 'unauthorized',
      },
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  return json<VersionResponse>(
    {
      success: true,
      result:
        context.env.CF_PAGES === '1'
          ? {
              environment: 'production',
              commit_sha: context.env.CF_PAGES_COMMIT_SHA,
              branch: context.env.CF_PAGES_BRANCH,
            }
          : {
              environment: 'development',
            },
    },
    {
      headers: {
        'Cache-Control': `max-age=${hoursToMilliseconds(1)} stale-while-revalidate=${minutesToMilliseconds(15)}`,
      },
    }
  )
}
