import { Button, Menu } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconChecks } from '@tabler/icons'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import type { Sdk } from '../graphql/generated/sdk'
import type { ProgramModel } from '../models/ProgramModel'

export const RecordButton: React.FC<{ program: ProgramModel; client: Sdk }> = ({ program, client }) => {
  const query = useQueryClient()

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
            episodeId: program.episode.id,
          })
          .then(() => {
            showNotification({
              title: '記録しました！',
              message: `${program.work.title} ${program.episode.label}`,
            })
            query.invalidateQueries(['programs']).catch(console.error)
          })
          .catch((e) => {
            showNotification({
              title: '記録できませんでした',
              message: `${program.work.title} ${program.episode.label}`,
            })
            console.error(e)
          })
      }}
    >
      記録
    </Button>
  )
}

export const BatchRecordButton: React.FC<{ program: ProgramModel; client: Sdk }> = ({ program }) => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button leftIcon={<IconChecks />} variant="light" color="green" mt="md" radius="md">
          まとめて記録
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>未視聴エピソード</Menu.Label>
        {program.remainingEpisodes.length > 0 ? (
          program.remainingEpisodes.map((e) => <Menu.Item key={e.id}>{e.label}</Menu.Item>)
        ) : (
          <Menu.Item disabled>未視聴エピソードはありません</Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
