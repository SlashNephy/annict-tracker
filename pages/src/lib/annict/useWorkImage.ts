import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import useSWRImmutable from 'swr/immutable'

import { fetchAniListImage } from '../anilist/fetchAniListImage.ts'
import { useArmSupplementaryDatastore } from '../arm/useArmSupplementaryDatastore.ts'
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

  const { data } = useSWRImmutable(
    [work.image?.recommendedImageUrl, aniListId, malId],
    async ([initialImageUrl, aniListId, malId]) => {
      // Mixed Contents にならない場合はそのまま返す
      if (initialImageUrl?.startsWith('https://')) {
        return initialImageUrl
      }

      // AniList から画像を引いてみる
      if (aniListId) {
        const response = await fetchAniListImage(aniListId)
        if (response.data.Media.coverImage.extraLarge) {
          return response.data.Media.coverImage.extraLarge
        }
      }

      // MyAnimeList から画像を引いてみる
      if (malId) {
        const response = await fetchJikanAnimePictures(malId)

        return response.data[0]?.webp?.large_image_url ?? response.data[0]?.jpg?.large_image_url
      }
    }
  )

  return {
    url: data,
    copyright: work.image?.copyright ?? undefined,
  }
}
