import { Box, Center, Image } from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons-react'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { useWorkImage } from '../../lib/annict/useWorkImage.ts'

import type { WorkCardImage_LibraryEntry$key } from '../../__generated__/WorkCardImage_LibraryEntry.graphql.ts'

export type WorkCardImageProps = {
  entryRef: WorkCardImage_LibraryEntry$key
}

export function WorkCardImage({ entryRef }: WorkCardImageProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment WorkCardImage_LibraryEntry on LibraryEntry {
        work {
          title
        }
        ...useWorkImage_LibraryEntry
      }
    `,
    entryRef
  )

  const imageUrl = useWorkImage(entry)
  return imageUrl ? (
    <Image alt={entry.work.title} height={200} src={imageUrl} title={entry.work.title} />
  ) : (
    <Center h={200}>
      <Box>
        <IconPhotoOff />
      </Box>
    </Center>
  )
}
