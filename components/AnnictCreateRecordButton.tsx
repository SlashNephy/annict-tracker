import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'

import { useAnnictClient } from '../lib/useAnnictClient'
import { useLibraryEntry } from '../lib/useLibraryEntry'

import type { ButtonProps } from '@mantine/core'

export const AnnictCreateRecordButton: React.FC<Omit<ButtonProps, 'disabled'>> = (props) => {
  const { entry } = useLibraryEntry()
  const client = useAnnictClient()
  const query = useQueryClient()

  const isDisabled = useMemo(() => {
    // エピソード情報がない
    if (entry.nextEpisode === null) {
      return true
    }

    // まだ放送されていない
    return entry.nextProgramStartAt !== null && new Date() < entry.nextProgramStartAt
  }, [entry])

  return (
    <Button
      {...props}
      disabled={isDisabled}
      onClick={() => {
        const episodeId = entry.nextEpisode?.id
        if (episodeId === undefined) {
          return
        }

        client
          .createRecord({ episodeId })
          .then(() => {
            showNotification({
              title: '記録しました！',
              message: `${entry.work.title} ${entry.nextEpisodeLabel}`,
            })
            query.invalidateQueries(['entries']).catch(console.error)
          })
          .catch((e) => {
            showNotification({
              title: '記録できませんでした',
              message: `${entry.work.title} ${entry.nextEpisodeLabel}`,
            })
            console.error(e)
          })
      }}
    >
      記録
    </Button>
  )
}
