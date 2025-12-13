import { getToken } from '@auth/core/jwt'

import type { Env } from '../env.ts'
import type { JWT } from '@auth/core/jwt'

// JWT を検証してユーザーを確認する
export async function verifyJwt(headers: Headers, env: Env): Promise<JWT | null> {
  return await getToken({
    req: {
      headers,
    },
    secureCookie: env.NODE_ENV !== 'development',
    secret: env.AUTH_SECRET,
    salt: env.AUTH_SALT,
  })
}
