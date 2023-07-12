import { Group, Loader, Stack, Text } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { differenceInMinutes, format, secondsToMilliseconds } from 'date-fns'
import React, { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { DateBadge } from './DateBadge.tsx'
import { RelativeTimeLabel } from './RelativeTimeLabel.tsx'
import {
  enableBrowserNotificationState,
  notificationHistoriesState,
  programNotificationThresholdMinutesState,
} from '../../lib/atoms.ts'
import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type { StackProps } from '@mantine/core'

export function WorkNextProgramInfo(props: Omit<StackProps, 'children'>): React.ReactElement {
  const { entry, isLoading, isError } = useLibraryEntry()
  const enableBrowserNotification = useRecoilValue(enableBrowserNotificationState)
  const programNotificationThresholdMinutes = useRecoilValue(programNotificationThresholdMinutesState)
  const [notificationHistories, setNotificationHistories] = useRecoilState(notificationHistoriesState)

  const createNotification = useCallback(() => {
    // ブラウザ通知が有効ではない
    if (!enableBrowserNotification || Notification.permission !== 'granted') {
      return
    }

    // 放送情報がない
    if (entry.nextProgramStartAt === null) {
      return
    }

    // 通知済み
    if (notificationHistories.includes(entry.id)) {
      return
    }

    const diff = differenceInMinutes(entry.nextProgramStartAt, new Date())
    if (diff < 0 || diff > programNotificationThresholdMinutes) {
      return
    }

    const _ = new Notification(entry.work.title, {
      body: `${entry.nextProgram?.channel.name}で${diff}分後に始まります\n\n${entry.nextEpisodeLabel}`,
      image: entry.workImageUrl,
      lang: 'ja',
    })
    setNotificationHistories((previous) => {
      previous.push(entry.id)
      return previous
    })
  }, [
    enableBrowserNotification,
    entry,
    programNotificationThresholdMinutes,
    notificationHistories,
    setNotificationHistories,
  ])

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
