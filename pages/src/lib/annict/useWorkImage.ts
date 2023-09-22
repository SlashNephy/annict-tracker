import { useQuery } from '@tanstack/react-query'
import { graphql, useFragment } from 'react-relay'

import { useArmSupplementaryDatastore } from '../arm/useArmSupplementaryDatastore.ts'
import { LocalStorageCacheManager } from '../cache.ts'
import { fetchJikanAnimePictures } from '../jikan/fetchJikanAnimePictures.ts'

import type { useWorkImage_LibraryEntry$key } from '../../__generated__/useWorkImage_LibraryEntry.graphql.ts'

// Annict が HTTP 画像を返して Mixed Contents になる場合があるので代替ソースでフォールバックする hook
export function useWorkImage(entryRef: useWorkImage_LibraryEntry$key): string | null {
  const { work } = useFragment(
    graphql`
      fragment useWorkImage_LibraryEntry on LibraryEntry {
        work {
          id
          annictId
          image {
            recommendedImageUrl
          }
          malAnimeId
        }
      }
    `,
    entryRef
  )

  const arm = useArmSupplementaryDatastore()
  const { data: imageUrl } = useQuery([`work-image-${work.id}`], async () => {
    const initialImageUrl = work.image?.recommendedImageUrl

    // Mixed Contents にならない場合はそのまま返す
    if (initialImageUrl?.startsWith('https://')) {
      return initialImageUrl
    }

    // MyAnimeList ID から画像を引いてみる
    const malId = arm?.findByAnnictId(work.annictId)?.mal_id?.toString() ?? work.malAnimeId
    if (malId) {
      // Local Storage のキャッシュが生きていれば使う
      const cache = LocalStorageCacheManager.get<string | null>(`work-image-${malId}`)
      if (cache) {
        return cache
      }

      const response = await fetchJikanAnimePictures(malId)
      const newImageUrl = response.data[0]?.webp?.large_image_url ?? response.data[0]?.jpg?.large_image_url
      if (newImageUrl) {
        LocalStorageCacheManager.set(`work-image-${malId}`, newImageUrl, {
          ttl: {
            days: 7,
          },
        })
        return newImageUrl
      }
    }

    // フォールバック不可能なのでそのまま返す
    return initialImageUrl ?? null
  })

  return imageUrl ?? null
}
