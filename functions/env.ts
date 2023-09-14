import type { AuthEnv } from './api/auth/[[auth]].ts'

export type Env = AuthEnv & {
  NODE_ENV?: 'development'
}
