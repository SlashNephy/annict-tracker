import { Text } from '@mantine/core'
import { graphql, useFragment } from 'react-relay'

import { useNextEpisodeTitle } from '../../lib/annict/useNextEpisodeTitle.ts'

import type { NextEpisodeTitle_LibraryEntry$key } from '../../__generated__/NextEpisodeTitle_LibraryEntry.graphql.ts'
import type { ReactNode } from 'react'

export type WorkNextEpisodeTitleProps = {
  entryRef: NextEpisodeTitle_LibraryEntry$key
}

export function NextEpisodeTitle({ entryRef }: WorkNextEpisodeTitleProps): ReactNode {
  const entry = useFragment(
    graphql`
      fragment NextEpisodeTitle_LibraryEntry on LibraryEntry {
        ...useNextEpisodeTitle_LibraryEntry
      }
    `,
    entryRef,
  )

  const nextEpisodeTitle = useNextEpisodeTitle(entry)
  if (!nextEpisodeTitle) {
    return null
  }

  return (
    <Text
      fw={500}
      style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      title={nextEpisodeTitle}
    >
      {nextEpisodeTitle}
    </Text>
  )
}
