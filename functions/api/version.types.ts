export type VersionResponse =
  | {
      success: true
      result:
        | {
            environment: 'development'
          }
        | {
            environment: 'production'
            commit_sha: string
            branch: string
          }
    }
  | {
      success: false
      error: string
    }
