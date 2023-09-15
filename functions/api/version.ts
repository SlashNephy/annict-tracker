import { json } from '../lib/response.ts'

import type { VersionResponse } from './version.types.ts'
import type { Env } from '../env.ts'

export const onRequestGet: PagesFunction<Env> = (context) => {
  return json<VersionResponse>(
    context.env.CF_PAGES === '1'
      ? {
          environment: 'production',
          commit_sha: context.env.CF_PAGES_COMMIT_SHA,
          branch: context.env.CF_PAGES_BRANCH,
        }
      : {
          environment: 'development',
        }
  )
}
