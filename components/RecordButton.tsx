import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import type { Sdk } from '../graphql/generated/sdk'
import type { LibraryEntryModel } from '../models/LibraryEntryModel'

export const RecordButton: React.FC<{ entry: LibraryEntryModel; client: Sdk }> = ({ entry, client }) => {
  const query = useQueryClient()

  if (entry.nextEpisode === null) {
    return null
  }

  return (
    <Button
      leftIcon={<IconCheck />}
      variant="light"
      color="blue"
      fullWidth
      mt="md"
      radius="md"
      onClick={() => {
        client
          .createRecord({
            // FIXME
            episodeId: entry.nextEpisode?.id ?? '',
          })
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
