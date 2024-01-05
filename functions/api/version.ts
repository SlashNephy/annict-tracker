import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'
import { StatusCodes } from 'http-status-codes'

import { verifyJwt } from '../lib/jwt.ts'

import type { VersionResponse } from './version.types.ts'
import type { Env } from '../env.ts'

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const jwt = await verifyJwt(context.request, context.env)
  if (!jwt) {
    return Response.json(
      {
        success: false,
        error: 'unauthorized',
      } satisfies VersionResponse,
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  return Response.json(
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
    } satisfies VersionResponse,
    {
      headers: {
        'Cache-Control': `max-age=${hoursToMilliseconds(1)} stale-while-revalidate=${minutesToMilliseconds(15)}`,
      },
    }
  )
}
