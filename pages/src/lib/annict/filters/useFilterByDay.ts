import { useAtomValue } from 'jotai'

import { useDayTag } from './useDayTag.ts'
import { dayFiltersAtom, timeFiltersAtom } from '../../jotai/filters.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export function useFilterByDay(entryRef: useNextProgram_LibraryEntry$key): boolean {
  const dayTag = useDayTag(entryRef)
  const dayFilters = useAtomValue(dayFiltersAtom)
  const timeFilters = useAtomValue(timeFiltersAtom)

  switch (dayTag) {
    case 'sunday':
      return dayFilters.includes('sunday')
    case 'monday':
      return dayFilters.includes('monday')
    case 'tuesday':
      return dayFilters.includes('tuesday')
    case 'wednesday':
      return dayFilters.includes('wednesday')
    case 'thursday':
      return dayFilters.includes('thursday')
    case 'friday':
      return dayFilters.includes('friday')
    case 'saturday':
      return dayFilters.includes('saturday')
    case null:
      return timeFilters.includes('undetermined')
  }
}
