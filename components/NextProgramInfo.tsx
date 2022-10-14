import { Group, Loader, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { format, hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { enableSyobocalState, syobocalChannelsState } from '../lib/atoms'
import { fetchSayaRemoteDatabase } from '../lib/services/saya'
import { lookupPrograms } from '../lib/services/syobocal'
import { LibraryEntryModel } from '../models/LibraryEntryModel'
import { DateBadge } from './DateBadge'
import { RelativeTimeLabel } from './RelativeTimeLabel'

export const NextProgramInfo: React.FC<{ entry: LibraryEntryModel }> = ({ entry }) => {
  const [enableSyobocal] = useRecoilState(enableSyobocalState)
  const [syobocalChannels] = useRecoilState(syobocalChannelsState)

  // saya の定義ファイル
  const { data: saya } = useQuery(['saya'], async () => await fetchSayaRemoteDatabase(), {
    retry: true,
    retryDelay: minutesToMilliseconds(1),
    refetchInterval: hoursToMilliseconds(1),
  })

  // しょぼかるの情報から放送時間を補完する
  const {
    data: syobocal,
    isLoading,
    isError,
  } = useQuery(
    [`syobocal-${entry.workSyobocalTid}`, enableSyobocal, syobocalChannels],
    async () => {
      // Annict 側でチャンネル選択が行われている
      if (entry.nextProgram !== null && entry.nextEpisode !== null) {
        return null
      }

      if (entry.nextEpisode === null || entry.workSyobocalTid === null || saya === undefined) {
        return null
      }

      const response = await lookupPrograms([entry.workSyobocalTid])
      const items = response.ProgLookupResponse?.ProgItems?.ProgItem?.reverse()?.filter(
        (x) => x.Count === entry.nextEpisode?.number
      )
      if (items === undefined) {
        return null
      }

      for (const program of items) {
        const annictChannel = saya.findChannelBySyobocalId(program.ChID)
        if (annictChannel?.annictId === undefined) {
          continue
        }

        if (syobocalChannels?.includes(annictChannel.annictId.toString()) !== true) {
          continue
        }

        return new LibraryEntryModel({
          ...entry.entity,
          nextProgram: {
            startedAt: program.StTime,
            rebroadcast: items.filter((x) => x.ChID === annictChannel.annictId).length > 1,
            channel: {
              annictId: annictChannel.annictId,
              name: annictChannel.name,
            },
          },
        })
      }

      return null
    },
    {
      enabled: enableSyobocal && saya !== undefined,
    }
  )

  const channelName = useMemo(
    () => syobocal?.nextProgram?.channel.name ?? entry.nextProgram?.channel.name,
    [syobocal, entry]
  )
  const startAt = useMemo(() => syobocal?.nextProgramStartAt ?? entry.nextProgramStartAt, [syobocal, entry])
  const startAtDay = useMemo(() => syobocal?.nextProgramStartAtDay ?? entry.nextProgramStartAtDay, [syobocal, entry])

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
      <Text>
        {startAt !== null && (
          <>
            {`${format(startAt, 'yyyy/MM/dd')} (${startAtDay}) ${format(startAt, 'HH:mm')}`} (
            <RelativeTimeLabel time={startAt} />)
          </>
        )}
        <DateBadge entry={entry} />
      </Text>
    </>
  )
}
