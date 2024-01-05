import { getToken } from '@auth/core/jwt'

import type { Env } from '../env.ts'
import type { JWT } from '@auth/core/jwt'

// JWT を検証してユーザーを確認する
export async function verifyJwt(request: Request, env: Env): Promise<JWT | null> {
  return await getToken({
    req: request,
    secureCookie: env.NODE_ENV !== 'development',
    secret: env.AUTH_SECRET,
    // XXX: salt は本来 optional だが要求されているので仕方なく falsy な空文字をセット
    salt: '',
  })
}
