import { json } from '../lib/response.ts'

import type { Env } from '../env.ts'

export type VersionResponse =
  | {
      environment: 'development'
    }
  | {
      environment: 'production'
      commit_sha: string
      branch: string
    }

export const onRequestGet: PagesFunction<Env> = (context) => {
  const response: VersionResponse =
    context.env.CF_PAGES === '1'
      ? {
          environment: 'production',
          commit_sha: context.env.CF_PAGES_COMMIT_SHA,
          branch: context.env.CF_PAGES_BRANCH,
        }
      : {
          environment: 'development',
        }

  return json(response)
}
