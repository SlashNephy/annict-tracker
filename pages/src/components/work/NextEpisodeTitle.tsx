import { Text } from '@mantine/core'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { useNextEpisodeTitle } from '../../lib/annict/useNextEpisodeTitle.ts'

import type { NextEpisodeTitle_LibraryEntry$key } from '../../__generated__/NextEpisodeTitle_LibraryEntry.graphql.ts'

export type WorkNextEpisodeTitleProps = {
  entryRef: NextEpisodeTitle_LibraryEntry$key
}

export function NextEpisodeTitle({ entryRef }: WorkNextEpisodeTitleProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment NextEpisodeTitle_LibraryEntry on LibraryEntry {
        ...useNextEpisodeTitle_LibraryEntry
      }
    `,
    entryRef
  )

  const nextEpisodeTitle = useNextEpisodeTitle(entry)
  if (!nextEpisodeTitle) {
    return <></>
  }

  return (
    <Text fw={500} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      {nextEpisodeTitle}
    </Text>
  )
}
