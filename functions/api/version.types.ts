export type VersionResponse =
  | {
      environment: 'development'
    }
  | {
      environment: 'production'
      commit_sha: string
      branch: string
    }
