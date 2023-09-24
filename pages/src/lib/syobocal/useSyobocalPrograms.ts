import { minutesToMilliseconds } from 'date-fns'
import { graphql, useFragment } from 'react-relay'
import useSWRImmutable from 'swr/immutable'

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
  const { data } = useSWRImmutable(
    `syobocal-program-${work.id}`,
    async () => {
      if (!enabled) {
        return []
      }

      // 次のエピソードがない
      if (!nextEpisode) {
        return []
      }

      // しょぼいカレンダーとの紐付けがされていない
      const syobocalTid = arm?.findByAnnictId(work.annictId)?.syobocal_tid ?? work.syobocalTid
      if (!syobocalTid) {
        return []
      }

      // TODO: 1リクエストにまとめたい
      const response = await lookupSyobocalPrograms([syobocalTid])
      return response.reverse().filter((x) => x.count === nextEpisode.number)
    },
    {
      refreshInterval: minutesToMilliseconds(30),
    }
  )

  return data ?? []
}
