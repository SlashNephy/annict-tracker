import { hoursToMilliseconds } from 'date-fns'
import { random } from 'radash'
import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import useSWRImmutable from 'swr/immutable'

import { fetchAniListImage } from '../anilist/fetchAniListImage.ts'
import { useArmSupplementaryDatastore } from '../arm/useArmSupplementaryDatastore.ts'
import { find, put } from '../indexdb/database.ts'
import { useIndexedDB } from '../indexdb/useIndexedDB.ts'
import { fetchJikanAnimePictures } from '../jikan/fetchJikanAnimePictures.ts'

import type { useWorkImage_LibraryEntry$key } from '../../__generated__/useWorkImage_LibraryEntry.graphql.ts'

export type WorkImage = {
  url?: string
  copyright?: string
}

// Annict が HTTP 画像を返して Mixed Contents になる場合があるので代替ソースでフォールバックする hook
export function useWorkImage(entryRef: useWorkImage_LibraryEntry$key): WorkImage {
  const { work } = useFragment(
    graphql`
      fragment useWorkImage_LibraryEntry on LibraryEntry {
        work {
          annictId
          image {
            recommendedImageUrl
            copyright
          }
          malAnimeId
        }
      }
    `,
    entryRef
  )

  // useSWR のキャッシュキーにクラスインスタンスを渡すと上手く動かないので外で事前計算しておく
  const arm = useArmSupplementaryDatastore()
  const [aniListId, malId] = useMemo(() => {
    const armEntry = arm?.findByAnnictId(work.annictId)

    return [armEntry?.anilist_id, armEntry?.mal_id?.toString() ?? work.malAnimeId]
  }, [arm, work])

  const database = useIndexedDB()
  const { data } = useSWRImmutable(
    [database, work.annictId, work.image?.recommendedImageUrl, aniListId, malId],
    async ([db, annictId, initialImageUrl, aniListId, malId]) => {
      // Mixed Contents にならない場合はそのまま返す
      if (initialImageUrl?.startsWith('https://')) {
        return initialImageUrl
      }

      // IndexedDB の準備ができていないときは外部リクエストしない
      if (!db) {
        return undefined
      }

      const cache = await find(db, 'work-image-cache', annictId)
      if (cache?.url) {
        return cache.url
      }

      // dog pile effect を避けるため 3 ~ 7 日間の間にランダムに TTL を設定する
      const day = hoursToMilliseconds(24)
      const ttl = random(day * 3, day * 7)

      // AniList から画像を引いてみる
      if (aniListId) {
        const response = await fetchAniListImage(aniListId)
        const url = response.data.Media.coverImage.extraLarge
        if (url) {
          await put(db, 'work-image-cache', annictId, { url }, ttl)

          return url
        }
      }

      // MyAnimeList から画像を引いてみる
      if (malId) {
        const response = await fetchJikanAnimePictures(malId)
        const url = response.data[0]?.webp?.large_image_url ?? response.data[0]?.jpg?.large_image_url
        if (url) {
          await put(db, 'work-image-cache', annictId, { url }, ttl)

          return url
        }
      }
    }
  )

  return {
    url: data,
    copyright: work.image?.copyright ?? undefined,
  }
}
