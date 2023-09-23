import { useAtomValue } from 'jotai'

import { useTimeTag } from './useTimeTag.ts'
import { timeFiltersAtom } from '../../jotai/filters.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export function useFilterByTime(entryRef: useNextProgram_LibraryEntry$key): boolean {
  const timeTag = useTimeTag(entryRef)
  const filters = useAtomValue(timeFiltersAtom)

  switch (timeTag) {
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
