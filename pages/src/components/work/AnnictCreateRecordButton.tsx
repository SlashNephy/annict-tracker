import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import React, { useCallback, useMemo } from 'react'
import { graphql, useMutation } from 'react-relay'

import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type { ButtonProps } from '@mantine/core'

const mutation = graphql`
  mutation AnnictCreateRecordButton_createRecordMutation($episodeId: ID!) {
    createRecord(input: { episodeId: $episodeId }) {
      clientMutationId
    }
  }
`

export function AnnictCreateRecordButton(props: Omit<ButtonProps, 'disabled'>): React.JSX.Element {
  const { entry } = useLibraryEntry()

  const isDisabled = useMemo(() => {
    // エピソード情報がない
    if (entry.nextEpisode === null) {
      return true
    }

    // まだ放送されていない
    return entry.nextProgramStartAt !== null && new Date() < entry.nextProgramStartAt
  }, [entry])

  const [commit, isInFlight] = useMutation(mutation)
  const handleClick = useCallback(() => {
    const episodeId = entry.nextEpisode?.id
    if (episodeId === undefined) {
      return
    }

    commit({
      variables: {
        episodeId,
      },
      onCompleted: () => {
        showNotification({
          title: '記録しました！',
          message: `${entry.work.title} ${entry.nextEpisodeLabel}`,
        })
      },
      onError: (e) => {
        showNotification({
          title: '記録できませんでした',
          message: `${entry.work.title} ${entry.nextEpisodeLabel}`,
        })
        console.error(e)
      },
    })
  }, [commit, entry])

  return (
    <Button {...props} disabled={isDisabled || isInFlight} onClick={handleClick}>
      記録
    </Button>
  )
}
