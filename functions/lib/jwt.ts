import { getToken } from '@auth/core/jwt'
import { parse } from 'cookie'

import type { Env } from '../env.ts'
import type { JWT } from '@auth/core/jwt'

// JWT を検証してユーザーを確認する
export async function verifyJwt(headers: Headers, env: Env): Promise<JWT | null> {
  return await getToken({
    req: {
      // XXX: @auth/core の実装が壊れており、context.request をそのまま渡すとセッション Cookie を確認してくれないので自前でパース
      cookies: parse(headers.get('Cookie') ?? ''),
      headers: {},
    },
    secureCookie: env.NODE_ENV === 'production',
    secret: env.AUTH_SECRET,
  })
}
