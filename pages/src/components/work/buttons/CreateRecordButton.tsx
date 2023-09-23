import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { graphql, useFragment, useMutation } from 'react-relay'

import { useShouldDisableButton } from './useShouldDisableButton.ts'
import { useNextEpisodeTitle } from '../../../lib/annict/useNextEpisodeTitle.ts'

import type { CreateRecordButton_LibraryEntry$key } from '../../../__generated__/CreateRecordButton_LibraryEntry.graphql.ts'

export type CreateRecordButtonProps = {
  entryRef: CreateRecordButton_LibraryEntry$key
}

export function CreateRecordButton({ entryRef }: CreateRecordButtonProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment CreateRecordButton_LibraryEntry on LibraryEntry {
        nextEpisode {
          id
          title
          number
          numberText
        }
        work {
          title
        }
        ...useNextEpisodeTitle_LibraryEntry
        ...useShouldDisableButton_LibraryEntry
      }
    `,
    entryRef
  )
  const { nextEpisode, work } = entry
  const nextEpisodeTitle = useNextEpisodeTitle(entry)
  const isDisabled = useShouldDisableButton(entry)

  const [commit, isInFlight] = useMutation(graphql`
    mutation CreateRecordButton_createRecordMutation($episodeId: ID!) {
      createRecord(input: { episodeId: $episodeId }) {
        clientMutationId
      }
    }
  `)
  const handleClick = useCallback(() => {
    const episodeId = nextEpisode?.id
    if (!episodeId) {
      return
    }

    commit({
      variables: {
        episodeId,
      },
      onCompleted: () => {
        showNotification({
          title: '記録しました！',
          message: `${work.title} ${nextEpisodeTitle ?? ''}`,
        })
      },
      onError: (e) => {
        showNotification({
          title: '記録に失敗しました',
          message: `${work.title} ${nextEpisodeTitle ?? ''}`,
        })
        console.error(e)
      },
    })
  }, [commit, nextEpisode, work, nextEpisodeTitle])

  return (
    <Button
      fullWidth
      color="blue"
      disabled={isDisabled || isInFlight}
      leftSection={<IconCheck />}
      mt="md"
      radius="md"
      variant="light"
      onClick={handleClick}
    >
      記録
    </Button>
  )
}