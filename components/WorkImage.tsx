import { Image } from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { fetchJikanAnimePictures } from '../lib/services/jikan'

import type { LibraryEntryModel } from '../models/LibraryEntryModel'

export const WorkImage: React.FC<{ entry: LibraryEntryModel }> = ({ entry }) => {
  // query data は undefined にできないので null にしておく
  const { data: imageUrl } = useQuery([entry.work.annictId], async () => {
    const { workImageUrl, workMalId } = entry
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
  })

  return (
    <Image
      src={imageUrl ?? undefined}
      height={200}
      alt={entry.work.title}
      withPlaceholder
      placeholder={<IconPhotoOff />}
    />
  )
}
