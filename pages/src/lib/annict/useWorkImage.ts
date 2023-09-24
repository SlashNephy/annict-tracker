import { graphql, useFragment } from 'react-relay'
import useSWRImmutable from 'swr/immutable'

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
  const { data: imageUrl } = useSWRImmutable(`work-image-${work.id}`, async () => {
    const initialImageUrl = work.image?.recommendedImageUrl

    // Mixed Contents にならない場合はそのまま返す
    if (initialImageUrl?.startsWith('https://')) {
      return initialImageUrl
    }

    // MyAnimeList ID から画像を引いてみる
    const malId = arm?.findByAnnictId(work.annictId)?.mal_id?.toString() ?? work.malAnimeId
    if (!malId) {
      return
    }

    const response = await fetchJikanAnimePictures(malId)
    return response.data[0]?.webp?.large_image_url ?? response.data[0]?.jpg?.large_image_url
  })

  return {
    url: imageUrl,
    copyright: work.image?.copyright ?? undefined,
  }
}
