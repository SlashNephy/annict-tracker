import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'

import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useShouldDisableButton_LibraryEntry$key } from '../../../__generated__/useShouldDisableButton_LibraryEntry.graphql.ts'

export function useShouldDisableButton(entryRef: useShouldDisableButton_LibraryEntry$key): boolean {
  const entry = useFragment(
    graphql`
      fragment useShouldDisableButton_LibraryEntry on LibraryEntry {
        nextEpisode {
          __typename
        }
        ...useNextProgram_LibraryEntry
      }
    `,
    entryRef
  )
  const nextProgram = useNextProgram(entry)

  return useMemo(() => {
    // エピソード情報がない
    if (entry.nextEpisode === null) {
      return true
    }

    // まだ放送されていない
    return !!nextProgram && new Date() < new Date(nextProgram.startAt)
  }, [entry.nextEpisode, nextProgram])
}
