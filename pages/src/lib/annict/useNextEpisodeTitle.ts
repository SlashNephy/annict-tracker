import { graphql, useFragment } from 'react-relay'

import type { useNextEpisodeTitle_LibraryEntry$key } from '../../__generated__/useNextEpisodeTitle_LibraryEntry.graphql.ts'

export function useNextEpisodeTitle(entry: useNextEpisodeTitle_LibraryEntry$key): string | null {
  const { nextEpisode } = useFragment(
    graphql`
      fragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {
        nextEpisode {
          title
          number
          numberText
        }
      }
    `,
    entry
  )

  if (!nextEpisode?.numberText && !nextEpisode?.number) {
    return null
  }

  const number = nextEpisode.numberText ?? `#${nextEpisode.number}`

  return nextEpisode.title ? `${number}「${nextEpisode.title}」` : number
}
