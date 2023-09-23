import { useInterval } from '@mantine/hooks'
import { differenceInMinutes, secondsToMilliseconds } from 'date-fns'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { graphql, useFragment } from 'react-relay'

import { useNextEpisodeTitle } from './useNextEpisodeTitle.ts'
import { useNextProgram } from './useNextProgram.ts'
import {
  enableBrowserNotificationState,
  notificationHistoriesState,
  programNotificationThresholdMinutesState,
} from '../recoil/notification.ts'

import type { useWatchProgramSchedule_LibraryEntry$key } from '../../__generated__/useWatchProgramSchedule_LibraryEntry.graphql.ts'

export function useWatchProgramSchedule(entryRef: useWatchProgramSchedule_LibraryEntry$key): void {
  const entry = useFragment(
    graphql`
      fragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {
        id
        work {
          title
          image {
            recommendedImageUrl
          }
        }
        ...useNextProgram_LibraryEntry
        ...useNextEpisodeTitle_LibraryEntry
      }
    `,
    entryRef
  )
  const { id, work } = entry
  const nextProgram = useNextProgram(entry)
  const nextEpisodeLabel = useNextEpisodeTitle(entry)

  const enableBrowserNotification = useAtomValue(enableBrowserNotificationState)
  const programNotificationThresholdMinutes = useAtomValue(programNotificationThresholdMinutesState)
  const [notificationHistories, setNotificationHistories] = useAtom(notificationHistoriesState)

  const createNotification = useCallback(() => {
    // ブラウザ通知が有効ではない
    if (!enableBrowserNotification || Notification.permission !== 'granted') {
      return
    }

    // 放送情報がない
    if (!nextProgram) {
      return
    }

    // 通知済み
    if (notificationHistories.includes(id)) {
      return
    }

    const diff = differenceInMinutes(nextProgram.startAt, new Date())
    if (diff < 0 || diff > programNotificationThresholdMinutes - 1) {
      return
    }

    const _ = new Notification(work.title, {
      body: `${nextProgram.channel.name}で${diff}分後に始まります\n\n${nextEpisodeLabel}`,
      image: work.image?.recommendedImageUrl ?? undefined,
      lang: 'ja',
    })
    setNotificationHistories((previous) => {
      previous.push(id)
      return previous
    })
  }, [
    enableBrowserNotification,
    nextProgram,
    notificationHistories,
    id,
    programNotificationThresholdMinutes,
    work,
    setNotificationHistories,
    nextEpisodeLabel,
  ])

  const timer = useInterval(createNotification, secondsToMilliseconds(30))
  useEffect(() => {
    timer.start()
    return timer.stop
  }, [timer])
}
