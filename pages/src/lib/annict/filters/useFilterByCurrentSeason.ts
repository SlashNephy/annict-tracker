import { useRecoilValue } from 'recoil'

import { useIsCurrentSeason } from './useIsCurrentSeason.ts'
import { showOnlyCurrentSeasonState } from '../../recoil/filters.ts'

import type { useIsCurrentSeason_LibraryEntry$key } from '../../../__generated__/useIsCurrentSeason_LibraryEntry.graphql.ts'

export function useFilterByCurrentSeason(entryRef: useIsCurrentSeason_LibraryEntry$key): boolean {
  const showOnlyCurrentSeason = useRecoilValue(showOnlyCurrentSeasonState)
  const isCurrentSeason = useIsCurrentSeason(entryRef)
  if (!showOnlyCurrentSeason) {
    return true
  }

  return isCurrentSeason
}
