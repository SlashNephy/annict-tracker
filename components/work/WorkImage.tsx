import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { LocalStorageCacheManager } from '../../lib/cache'
import { fetchJikanAnimePictures } from '../../lib/services/jikan'
import { useArmSupplementary } from '../../lib/useArmSupplementary'
import { useLibraryEntry } from '../../lib/useLibraryEntry'

import type { ImageProps } from '@mantine/core'

export function WorkImage(props: Omit<ImageProps, 'src'>): React.ReactElement {
  const { entry } = useLibraryEntry()
  const arm = useArmSupplementary(true)

  // query data は undefined にできないので null にしておく
  const { data: imageUrl } = useQuery(
    [entry.work.annictId],
    async () => {
      const { workImageUrl } = entry

      // Mixed Contents にならない場合はそのまま返す
      if (workImageUrl?.startsWith('https://') === true) {
        return workImageUrl
      }

      const workMalId = arm?.findByAnnictId(entry.work.annictId)?.mal_id?.toString() ?? entry.work.malAnimeId

      // フォールバック不可能なのでそのまま返す
      if (workMalId === null) {
        return workImageUrl ?? null
      }

      const cache = LocalStorageCacheManager.get<string | null>(`work-image-${workMalId}`)
      if (cache !== undefined) {
        return cache
      }

      try {
        const response = await fetchJikanAnimePictures(workMalId)
        const url = response.data[0].webp?.large_image_url ?? response.data[0].jpg?.large_image_url ?? null
        LocalStorageCacheManager.set(`work-image-${workMalId}`, url, {
          ttl: {
            days: 7,
          },
        })

        return url
      } catch {
        return workImageUrl ?? null
      }
    },
    {
      enabled: arm !== undefined,
    }
  )

  return <Image {...props} alt={entry.work.title} src={imageUrl ?? undefined} />
}
