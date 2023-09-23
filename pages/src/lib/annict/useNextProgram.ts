import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'

import { enableSyobocalAtom, syobocalChannelsAtom } from '../jotai/syobocal.ts'
import { useSayaDatastore } from '../saya/useSayaDatastore.ts'
import { useSyobocalPrograms } from '../syobocal/useSyobocalPrograms.ts'

import type { useNextProgram_LibraryEntry$key } from '../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type NextProgram = {
  startAt: Date
  channel: {
    annictId: number
    name: string
  }
  isRebroadcast: boolean
  source: string
}

export function useNextProgram(entryRef: useNextProgram_LibraryEntry$key): NextProgram | null {
  const entry = useFragment(
    graphql`
      fragment useNextProgram_LibraryEntry on LibraryEntry {
        nextProgram {
          startedAt
          channel {
            annictId
            name
          }
          rebroadcast
        }
        ...useSyobocalPrograms_LibraryEntry
      }
    `,
    entryRef
  )

  // Annict の放送情報が利用できるかどうか
  const isAnnictAvailable = useMemo(() => !!entry.nextProgram, [entry.nextProgram])
  const enableSyobocal = useAtomValue(enableSyobocalAtom)
  const syobocalChannels = useAtomValue(syobocalChannelsAtom)

  // Annict の放送情報があるときは取得する必要はない
  const programs = useSyobocalPrograms(entry, !isAnnictAvailable && enableSyobocal)
  const saya = useSayaDatastore(!isAnnictAvailable && enableSyobocal)

  return useMemo(() => {
    // Annict 側でチャンネル選択が行われていて、Annict API から放送情報を取得できている
    if (entry.nextProgram) {
      return {
        startAt: new Date(entry.nextProgram.startedAt),
        channel: {
          annictId: entry.nextProgram.channel.annictId,
          name: entry.nextProgram.channel.name,
        },
        isRebroadcast: entry.nextProgram.rebroadcast,
        source: 'annict',
      }
    }

    for (const program of programs) {
      const annictChannel = saya?.findChannelBySyobocalId(program.ChID)
      if (!annictChannel?.annictId) {
        continue
      }

      if (!syobocalChannels.includes(annictChannel.annictId.toString())) {
        continue
      }

      const channelPrograms = programs.filter((x) => x.ChID === annictChannel.annictId)
      return {
        startAt: new Date(program.StTime),
        channel: {
          annictId: annictChannel.annictId,
          name: annictChannel.name,
        },
        isRebroadcast: Object.values(channelPrograms.groupBy((x) => x.Count)).some((x) => x.length > 1),
        source: 'syobocal',
      }
    }

    return null
  }, [entry.nextProgram, programs, saya, syobocalChannels])
}
