export type Env = CloudflarePagesEnv & {
  NODE_ENV?: 'production' | 'development'

  AUTH_SECRET: string
  ANNICT_CLIENT_ID: string
  ANNICT_CLIENT_SECRET: string
}

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
