import { useAtomValue } from 'jotai'
import { graphql, useFragment } from 'react-relay'

import { showOnlyCurrentSeasonAtom } from '../../jotai/filters.ts'
import { getSeasonOf } from '../getSeasonOf.ts'

import type { useFilterByCurrentSeason_LibraryEntry$key } from '../../../__generated__/useFilterByCurrentSeason_LibraryEntry.graphql.ts'

export function useFilterByCurrentSeason(entryRef: useFilterByCurrentSeason_LibraryEntry$key): boolean {
  const { work } = useFragment(
    graphql`
      fragment useFilterByCurrentSeason_LibraryEntry on LibraryEntry {
        work {
          seasonYear
          seasonName
        }
      }
    `,
    entryRef
  )

  const showOnlyCurrentSeason = useAtomValue(showOnlyCurrentSeasonAtom)
  if (!showOnlyCurrentSeason) {
    return true
  }

  const now = new Date()
  const { year, name } = getSeasonOf(now)
  return work.seasonYear === year && work.seasonName === name
}
