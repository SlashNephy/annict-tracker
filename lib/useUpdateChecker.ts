import { useInterval } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { minutesToMilliseconds } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'

import { fetchCommits } from './services/github'

export const useUpdateChecker = (): void => {
  const [lastCommitDate, setLastCommitDate] = useState<Date | null>(null)

  const check = useCallback(() => {
    fetchCommits('SlashNephy/annict-tracker', 'master', 1)
      .then(([commit]) => {
        const commitDate = new Date(commit.commit.author.date)
        if (lastCommitDate !== null && lastCommitDate < commitDate) {
          showNotification({
            title: '新しいバージョンが公開されています',
            message: '更新するにはページをリロードしてください',
            autoClose: false,
          })
        }

        setLastCommitDate(commitDate)
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
