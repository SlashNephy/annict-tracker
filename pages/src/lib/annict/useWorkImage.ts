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
          id
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

  const arm = useArmSupplementaryDatastore()
  const armEntry = useMemo(() => arm?.findByAnnictId(work.annictId), [work.annictId, arm])

  const aniListId = useMemo(() => armEntry?.anilist_id, [armEntry])
  const malId = useMemo(() => armEntry?.mal_id?.toString() ?? work.malAnimeId, [armEntry, work.malAnimeId])

  const { data: imageUrl } = useSWRImmutable([`work-image-${work.annictId}`, aniListId, malId], async () => {
    const initialImageUrl = work.image?.recommendedImageUrl

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

      console.log(response)
    }

    // MyAnimeList から画像を引いてみる
    if (malId) {
      const response = await fetchJikanAnimePictures(malId)
      return response.data[0]?.webp?.large_image_url ?? response.data[0]?.jpg?.large_image_url
    }
  })

  return {
    url: imageUrl,
    copyright: work.image?.copyright ?? undefined,
  }
}
