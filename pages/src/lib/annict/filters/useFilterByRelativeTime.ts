import { useAtomValue } from 'jotai'

import { timeFiltersAtom } from '../../jotai/filters.ts'
import { useRelativeTimeGroup } from '../relativeTimeGroups.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export function useFilterByRelativeTime(entryRef: useNextProgram_LibraryEntry$key): boolean {
  const group = useRelativeTimeGroup(entryRef)
  const filters = useAtomValue(timeFiltersAtom)

  switch (group) {
    case 'yesterday':
      return filters.includes('yesterday')
    case 'today':
      return filters.includes('today')
    case 'tomorrow':
      return filters.includes('tomorrow')
    case 'finished':
      return filters.includes('finished')
    case 'future':
      return filters.includes('future')
    case 'undetermined':
      return filters.includes('undetermined')
  }
}
