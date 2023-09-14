import type { AuthEnv } from './api/auth/[[auth]].ts'

// https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables
type CloudflarePagesEnv =
  | {
      CF_PAGES: undefined
    }
  | {
      CF_PAGES: '1'
      CF_PAGES_COMMIT_SHA: string
      CF_PAGES_BRANCH: string
      CF_PAGES_URL: string
    }

export type Env = {
  NODE_ENV?: 'development'
} & CloudflarePagesEnv &
  AuthEnv
