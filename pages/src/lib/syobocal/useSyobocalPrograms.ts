import { hoursToMilliseconds } from 'date-fns'
import { graphql, useFragment } from 'react-relay'
import useSWR from 'swr'

import { lookupSyobocalPrograms } from './lookupSyobocalPrograms.ts'
import { useArmSupplementaryDatastore } from '../arm/useArmSupplementaryDatastore.ts'

import type { useSyobocalPrograms_LibraryEntry$key } from '../../__generated__/useSyobocalPrograms_LibraryEntry.graphql.ts'
import type { SyobocalProgram } from 'functions/api/syobocal/programs.types.ts'

// しょぼいカレンダーの API から放送スケジュールを取得する hook
export function useSyobocalPrograms(entryRef: useSyobocalPrograms_LibraryEntry$key, enabled = true): SyobocalProgram[] {
  const { work, nextEpisode } = useFragment(
    graphql`
      fragment useSyobocalPrograms_LibraryEntry on LibraryEntry {
        work {
          id
          annictId
          syobocalTid
        }
        nextEpisode {
          number
        }
      }
    `,
    entryRef
  )

  const arm = useArmSupplementaryDatastore(enabled)
  const { data } = useSWR(
    enabled ? `syobocal-program-${work.id}` : null,
    async () => {
      // 次のエピソードがない
      if (!nextEpisode) {
        return []
      }

      // しょぼいカレンダーとの紐付けがされていない
      const syobocalTid = arm.findByAnnictId(work.annictId)?.syobocal_tid ?? work.syobocalTid
      if (!syobocalTid) {
        return []
      }

      // TODO: 1リクエストにまとめたい
      const response = await lookupSyobocalPrograms([syobocalTid])
      return (
        response.ProgLookupResponse?.ProgItems?.ProgItem?.reverse()?.filter((x) => x.Count === nextEpisode.number) ?? []
      )
    },
    {
      suspense: true,
      refreshInterval: hoursToMilliseconds(6),
    }
  )

  return data
}
