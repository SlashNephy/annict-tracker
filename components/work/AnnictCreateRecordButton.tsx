import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'

import { CreateRecordDocument } from '../../graphql/annict/generated/graphql.ts'
import { useAnnictClient } from '../../lib/useAnnictClient.ts'
import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type { ButtonProps } from '@mantine/core'

export function AnnictCreateRecordButton(props: Omit<ButtonProps, 'disabled'>): React.ReactElement {
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
          .request(CreateRecordDocument, { episodeId })
          .then(() => {
            showNotification({
              title: '記録しました！',
              message: `${entry.work.title} ${entry.nextEpisodeLabel}`,
            })
            query.invalidateQueries(['entries']).catch(console.error)
          })
          .catch((e: unknown) => {
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
