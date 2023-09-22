import { graphql, useFragment } from 'react-relay'

import type { useIsCurrentSeason_LibraryEntry$key } from '../../../__generated__/useIsCurrentSeason_LibraryEntry.graphql.ts'

export type SeasonName = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'

export function useIsCurrentSeason(entryRef: useIsCurrentSeason_LibraryEntry$key): boolean {
  const { work } = useFragment(
    graphql`
      fragment useIsCurrentSeason_LibraryEntry on LibraryEntry {
        work {
          seasonYear
          seasonName
        }
      }
    `,
    entryRef
  )

  const now = new Date()
  return work.seasonYear === now.getFullYear() && work.seasonName === getSeason(now)
}

function getSeason(date: Date): SeasonName {
  const month = date.getMonth() + 1

  if (month >= 1 && month <= 3) {
    return 'WINTER'
  }

  if (month >= 4 && month <= 6) {
    return 'SPRING'
  }

  if (month >= 7 && month <= 9) {
    return 'SUMMER'
  }

  return 'AUTUMN'
}
