import { Image } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { fetchJikanAnimePictures } from '../lib/services/jikan'
import { useArmSupplementary } from '../lib/useArmSupplementary'

import type { LibraryEntryModel } from '../models/LibraryEntryModel'
import type { ImageProps } from '@mantine/core'

export const WorkImage: React.FC<{ entry: LibraryEntryModel } & Omit<ImageProps, 'src'>> = ({ entry, ...props }) => {
  const arm = useArmSupplementary()

  // query data は undefined にできないので null にしておく
  const { data: imageUrl } = useQuery(
    [entry.work.annictId],
    async () => {
      const { workImageUrl } = entry
      const workMalId = arm?.findByAnnictId(entry.work.annictId)?.mal_id?.toString() ?? entry.work.malAnimeId

      // フォールバック不可能なのでそのまま返す
      if (workMalId === null) {
        return workImageUrl ?? null
      }

      // Mixed Contents にならない場合はそのまま返す
      if (workImageUrl?.startsWith('https://') === true) {
        return workImageUrl
      }

      try {
        const response = await fetchJikanAnimePictures(workMalId)
        return response.data[0].webp?.large_image_url ?? response.data[0].jpg?.large_image_url ?? null
      } catch {
        return workImageUrl ?? null
      }
    },
    {
      enabled: arm !== undefined,
    }
  )

  return <Image {...props} src={imageUrl ?? undefined} />
}
