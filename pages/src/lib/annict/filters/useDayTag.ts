import { useNextProgram } from '../useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type DayTag = (typeof dayOfWeek)[number]

export function useDayTag(entryRef: useNextProgram_LibraryEntry$key): DayTag | null {
  const nextProgram = useNextProgram(entryRef)
  if (!nextProgram) {
    return null
  }

  return dayOfWeek[nextProgram.startAt.getDay()] ?? null
}
