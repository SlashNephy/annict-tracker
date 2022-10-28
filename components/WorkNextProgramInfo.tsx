import { Group, Loader, Stack, Text } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { differenceInMinutes, format, secondsToMilliseconds } from 'date-fns'
import React, { useCallback, useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { enableBrowserNotificationState, programNotificationThresholdMinutesState } from '../lib/atoms'
import { useLibraryEntry } from '../lib/useLibraryEntry'
import { DateBadge } from './DateBadge'
import { RelativeTimeLabel } from './RelativeTimeLabel'

import type { StackProps } from '@mantine/core'

export const WorkNextProgramInfo: React.FC<Omit<StackProps, 'children'>> = (props) => {
  const { entry, isLoading, isError } = useLibraryEntry()
  const enableBrowserNotification = useRecoilValue(enableBrowserNotificationState)
  const programNotificationThresholdMinutes = useRecoilValue(programNotificationThresholdMinutesState)

  const createNotification = useCallback(() => {
    // ブラウザ通知が有効ではない
    if (!enableBrowserNotification || Notification.permission !== 'granted') {
      return
    }

    // 放送情報がない
    if (entry.nextProgramStartAt === null) {
      return
    }

    const diff = differenceInMinutes(entry.nextProgramStartAt, new Date())
    if (diff < 0 || diff > programNotificationThresholdMinutes) {
      return
    }

    new Notification(entry.work.title, {
      body: `${entry.nextProgram?.channel.name}で${diff}分後に始まります\n\n${entry.nextEpisodeLabel}`,
      image: entry.workImageUrl,
      lang: 'ja',
    })
  }, [enableBrowserNotification, entry, programNotificationThresholdMinutes])
  const timer = useInterval(createNotification, secondsToMilliseconds(30))

  useEffect(() => {
    timer.start()
    return timer.stop
  }, [timer])

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
            <Text span size="sm">
              (<RelativeTimeLabel span time={entry.nextProgramStartAt} />)
            </Text>
          </>
        )}
      </Text>
    </Stack>
  )
}
