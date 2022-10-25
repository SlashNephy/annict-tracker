import { Group, Loader, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { differenceInMinutes, format, hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'
import React, { useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import {
  enableBrowserNotificationState,
  enableSyobocalState,
  programNotificationThresholdMinutesState,
  syobocalChannelsState,
} from '../lib/atoms'
import { fetchSayaRemoteDatabase } from '../lib/services/saya'
import { lookupPrograms } from '../lib/services/syobocal'
import { useArmSupplementary } from '../lib/useArmSupplementary'
import { LibraryEntryModel } from '../models/LibraryEntryModel'
import { DateBadge } from './DateBadge'
import { RelativeTimeLabel } from './RelativeTimeLabel'

export const NextProgramInfo: React.FC<{ entry: LibraryEntryModel }> = ({ entry }) => {
  const [enableSyobocal] = useRecoilState(enableSyobocalState)
  const [syobocalChannels] = useRecoilState(syobocalChannelsState)
  const [enableBrowserNotification] = useRecoilState(enableBrowserNotificationState)
  const [programNotificationThresholdMinutes] = useRecoilState(programNotificationThresholdMinutesState)

  const arm = useArmSupplementary()

  // saya の定義ファイル
  const { data: saya } = useQuery(['saya'], async () => await fetchSayaRemoteDatabase(), {
    retry: true,
    retryDelay: minutesToMilliseconds(1),
    refetchInterval: hoursToMilliseconds(1),
  })

  // しょぼかるの情報から放送時間を補完する
  const {
    data: syobocals,
    isLoading,
    isError,
  } = useQuery(
    [`syobocal-${entry.work.annictId}`, enableSyobocal],
    async () => {
      // Annict 側でチャンネル選択が行われている
      if (entry.nextProgram !== null && entry.nextEpisode !== null) {
        return null
      }

      const workSyobocalTid = arm?.findByAnnictId(entry.work.annictId)?.syobocal_tid ?? entry.work.syobocalTid
      if (entry.nextEpisode === null || workSyobocalTid === null || saya === undefined) {
        return null
      }

      const response = await lookupPrograms([workSyobocalTid])
      return (
        response.ProgLookupResponse?.ProgItems?.ProgItem?.reverse()?.filter(
          (x) => x.Count === entry.nextEpisode?.number
        ) ?? []
      )
    },
    {
      enabled: enableSyobocal && saya !== undefined && arm !== undefined,
    }
  )
  const syobocal = useMemo(() => {
    if (!enableSyobocal || !Array.isArray(syobocals)) {
      return null
    }

    for (const program of syobocals) {
      const annictChannel = saya?.findChannelBySyobocalId(program.ChID)
      if (annictChannel?.annictId === undefined) {
        continue
      }

      if (!syobocalChannels.includes(annictChannel.annictId.toString())) {
        continue
      }

      return new LibraryEntryModel({
        ...entry.entity,
        nextProgram: {
          startedAt: program.StTime,
          rebroadcast: syobocals.filter((x) => x.ChID === annictChannel.annictId).length > 1,
          channel: {
            annictId: annictChannel.annictId,
            name: annictChannel.name,
          },
        },
      })
    }

    return null
  }, [saya, syobocals, syobocalChannels, entry, enableSyobocal])

  const channelName = useMemo(
    () => syobocal?.nextProgram?.channel.name ?? entry.nextProgram?.channel.name,
    [syobocal, entry]
  )
  const startAt = useMemo(() => syobocal?.nextProgramStartAt ?? entry.nextProgramStartAt, [syobocal, entry])
  const startAtDay = useMemo(() => syobocal?.nextProgramStartAtDay ?? entry.nextProgramStartAtDay, [syobocal, entry])

  useEffect(() => {
    if (enableBrowserNotification && startAt !== null && Notification.permission === 'granted') {
      const diff = differenceInMinutes(startAt, new Date())

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
  }, [enableBrowserNotification, startAt, entry, programNotificationThresholdMinutes])

  if (isError) {
    return (
      <Group>
        <Text color="dimmed">放送予定の取得に失敗しました</Text>
      </Group>
    )
  }

  if (isLoading && enableSyobocal) {
    return (
      <Group>
        <Loader size="sm" />
        <Text>放送予定を取得中...</Text>
      </Group>
    )
  }

  return (
    <>
      <Text style={{ whiteSpace: 'nowrap' }}>{channelName}</Text>
      {startAt !== null && (
        <Text>
          <>
            {`${format(startAt, 'yyyy/MM/dd')} (${startAtDay}) ${format(startAt, 'HH:mm')}`} (
            <RelativeTimeLabel time={startAt} />)
          </>
        </Text>
      )}
      <Text>
        <DateBadge entry={entry} />
      </Text>
    </>
  )
}
