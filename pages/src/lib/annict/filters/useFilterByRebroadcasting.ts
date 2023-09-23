import { useAtomValue } from 'jotai'

import { hideRebroadcastingState } from '../../recoil/filters.ts'
import { useNextProgram } from '../useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export function useFilterByRebroadcasting(entryRef: useNextProgram_LibraryEntry$key): boolean {
  const nextProgram = useNextProgram(entryRef)
  const hideRebroadcasting = useAtomValue(hideRebroadcastingState)
  if (!hideRebroadcasting) {
    return true
  }

  return nextProgram?.isRebroadcast !== true
}
