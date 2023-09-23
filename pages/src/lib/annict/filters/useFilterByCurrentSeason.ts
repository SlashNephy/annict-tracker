import { useAtomValue } from 'jotai'

import { useIsCurrentSeason } from './useIsCurrentSeason.ts'
import { showOnlyCurrentSeasonAtom } from '../../jotai/filters.ts'

import type { useIsCurrentSeason_LibraryEntry$key } from '../../../__generated__/useIsCurrentSeason_LibraryEntry.graphql.ts'

export function useFilterByCurrentSeason(entryRef: useIsCurrentSeason_LibraryEntry$key): boolean {
  const showOnlyCurrentSeason = useAtomValue(showOnlyCurrentSeasonAtom)
  const isCurrentSeason = useIsCurrentSeason(entryRef)
  if (!showOnlyCurrentSeason) {
    return true
  }

  return isCurrentSeason
}
