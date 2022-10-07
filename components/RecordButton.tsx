import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import React from 'react'

import type { Sdk } from '../graphql/generated/sdk'
import type { ViewerProgram } from '../lib/services/annict'

export const RecordButton: React.FC<{ program: ViewerProgram; client: Sdk }> = ({ program, client }) => {
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
            episodeId: program.episode.annictId as unknown as string,
          })
          .then(() => {
            showNotification({
              title: '記録しました！',
              message: `${program.work.title} ${program.episode.numberText ?? `#${program.episode.number}`}`,
            })
          })
          .catch((e) => {
            showNotification({
              title: '記録できませんでした',
              message: `${program.work.title} ${program.episode.numberText ?? `#${program.episode.number}`}`,
            })
            console.error(e)
          })
      }}
    >
      記録する
    </Button>
  )
}
