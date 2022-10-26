import { Group, Loader, Stack, Text } from '@mantine/core'
import { differenceInMinutes, format, minutesToMilliseconds } from 'date-fns'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { enableBrowserNotificationState, programNotificationThresholdMinutesState } from '../lib/atoms'
import { useLibraryEntry } from '../lib/useLibraryEntry'
import { DateBadge } from './DateBadge'
import { RelativeTimeLabel } from './RelativeTimeLabel'

import type { StackProps } from '@mantine/core'

export const WorkNextProgramInfo: React.FC<Omit<StackProps, 'children'>> = (props) => {
  const { entry, isLoading, isError } = useLibraryEntry()
  const [enableBrowserNotification] = useRecoilState(enableBrowserNotificationState)
  const [programNotificationThresholdMinutes] = useRecoilState(programNotificationThresholdMinutesState)

  useEffect(() => {
    if (enableBrowserNotification && entry.nextProgramStartAt !== null && Notification.permission === 'granted') {
      const diff = differenceInMinutes(entry.nextProgramStartAt, new Date())

      // n分前に通知する
      if (diff > 0) {
        const timeout = setTimeout(() => {
          const item = new Notification(entry.work.title, {
            body: `${entry.nextProgram?.channel.name}で${Math.ceil(diff)}分後に始まります\n\n${entry.nextEpisodeLabel}`,
            image: entry.workImageUrl,
            lang: 'ja',
            requireInteraction: true,
          })

          setTimeout(() => {
            item.close()
          }, minutesToMilliseconds(diff))
        }, Math.max(minutesToMilliseconds(diff - programNotificationThresholdMinutes), 0))

        return () => {
          clearTimeout(timeout)
        }
      }
    }
  }, [enableBrowserNotification, entry, programNotificationThresholdMinutes])

  if (isError) {
    return (
      <Group>
        <Text color="dimmed">放送予定の取得に失敗しました</Text>
      </Group>
    )
  }

  if (isLoading) {
    return (
      <Group>
        <Loader size="sm" />
        <Text>放送予定を取得中...</Text>
      </Group>
    )
  }

  return (
    <Stack {...props}>
      <Text>
        <Group>
          <Text span>{entry.nextProgram?.channel.name}</Text>
          <DateBadge />
        </Group>
      </Text>

      <Text>
        {entry.nextProgramStartAt !== null && (
          <>
            <Text span>{format(entry.nextProgramStartAt, 'yyyy/MM/dd')}</Text>
            <Text span> ({entry.nextProgramStartAtDay})</Text>
            <Text span> {format(entry.nextProgramStartAt, 'HH:mm')} </Text>
            <Text span>
              (<RelativeTimeLabel span size="sm" time={entry.nextProgramStartAt} />)
            </Text>
          </>
        )}
      </Text>
    </Stack>
  )
}
