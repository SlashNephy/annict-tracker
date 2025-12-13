import { minutesToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import useSWRImmutable from 'swr/immutable'

import { useArmSupplementaryDatastore } from '../arm/useArmSupplementaryDatastore.ts'
import { lookupSyobocalPrograms } from './lookupSyobocalPrograms.ts'

import type { SyobocalProgram } from '../../../../functions/api/syobocal/programs.types.ts'
import type { useSyobocalPrograms_LibraryEntry$key } from '../../__generated__/useSyobocalPrograms_LibraryEntry.graphql.ts'

// しょぼいカレンダーの API から放送スケジュールを取得する hook
export function useSyobocalPrograms(entryRef: useSyobocalPrograms_LibraryEntry$key, enabled = true): SyobocalProgram[] {
  const { work, nextEpisode } = useFragment(
    graphql`
      fragment useSyobocalPrograms_LibraryEntry on LibraryEntry {
        work {
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

  // useSWR のキャッシュキーにクラスインスタンスを渡すと上手く動かないので外で事前計算しておく
  const arm = useArmSupplementaryDatastore(enabled)
  const syobocalTid = useMemo(() => arm?.findByAnnictId(work.annictId)?.syobocal_tid ?? work.syobocalTid, [arm, work])

  const { data } = useSWRImmutable(
    [enabled, nextEpisode?.number, syobocalTid],
    async ([enabled, nextEpisodeNumber, syobocalTid]) => {
      // 以下の場合はしょぼいカレンダーの放送予定を参照しない
      // - このフックで無効化されている
      // - この作品の次のエピソードがない
      // - この作品がしょぼいカレンダーとの紐付けがされていない
      if (!enabled || !nextEpisodeNumber || !syobocalTid) {
        return []
      }

      const response = await lookupSyobocalPrograms(syobocalTid)

      return response.reverse().filter((x) => x.count === nextEpisodeNumber)
    },
    {
      refreshInterval: minutesToMilliseconds(30),
    }
  )

  return data ?? []
}
