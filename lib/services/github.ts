export type GithubCommit = {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: string
      payload: string
    }
  }
  url: string
  html_url: string
  comments_url: string
  author: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  committer: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  parents: {
    sha: string
    url: string
    html_url: string
  }[]
}

export type GitHubError = {
  documentation_url: string
  message: string
}

export const fetchCommits = async (
  repository: string,
  branch: string,
  perPage: number
): Promise<GithubCommit[] | GitHubError> => {
  const response = await fetch(`https://api.github.com/repos/${repository}/commits?sha=${branch}&per_page=${perPage}`)
  return await response.json()
}
