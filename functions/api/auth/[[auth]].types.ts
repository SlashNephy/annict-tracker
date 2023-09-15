import type { JWT } from '@auth/core/jwt'
import type { Session } from '@auth/core/types'

export type AnnictSession = Session & {
  accessToken?: string
}

export type AnnictJwt = JWT & {
  accessToken?: string
}
