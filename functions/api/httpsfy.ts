import { StatusCodes } from 'http-status-codes'
import queryString from 'query-string'
import { z } from 'zod'

import { verifyJwt } from '../lib/jwt.ts'

import type { Env } from '../env.ts'

const schema = z.object({
  url: z.string().url(),
})

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = queryString.parseUrl(context.request.url)
  const query = await schema.safeParseAsync(url.query)
  if (!query.success) {
    return new Response(null, { status: StatusCodes.BAD_REQUEST })
  }

  const jwt = await verifyJwt(context.request.headers, context.env)
  if (!jwt) {
    return new Response(null, { status: StatusCodes.UNAUTHORIZED })
  }

  return await fetch(query.data.url)
}
