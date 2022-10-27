import { useInterval } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { minutesToMilliseconds } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { fetchCommits } from './services/github'

export const useUpdateChecker = (): void => {
  const [lastCommitDate, setLastCommitDate] = useState<Date | null>(null)

  const check = useCallback(() => {
    // https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables
    const repository = [
      process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ?? 'SlashNephy',
      process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG ?? 'annict-tracker',
    ].join('/')
    const branch = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ?? 'master'

    fetchCommits(repository, branch, 1)
      .then((response) => {
        if ('message' in response) {
          throw new Error(`GitHub API returned an error: ${response.message} (${response.documentation_url})`)
        }

        if (response.length === 0) {
          return
        }

        const [commit] = response
        const buildCommitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
        if (buildCommitSha !== undefined && buildCommitSha !== commit.sha) {
          showNotification({
            id: 'update-checker',
            title: '新しいバージョンが公開されています',
            message: '更新するにはページをリロードしてください',
            autoClose: false,
          })
        } else {
          const commitDate = new Date(commit.commit.author.date)
          if (lastCommitDate !== null && lastCommitDate < commitDate) {
            showNotification({
              id: 'update-checker',
              title: '新しいバージョンが公開されています',
              message: '更新するにはページをリロードしてください',
              autoClose: false,
            })
          }

          setLastCommitDate(commitDate)
        }
      })
      .catch(console.error)
  }, [lastCommitDate, setLastCommitDate])

  const interval = useInterval(check, minutesToMilliseconds(15))
  useEffect(() => {
    check()
    interval.start()
    return interval.stop
  }, [])
}
