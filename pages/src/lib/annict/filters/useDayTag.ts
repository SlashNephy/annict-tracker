import { useNextProgram } from '../useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

// TODO: 不要なリテラルを整理する
const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type DayTag = (typeof dayOfWeek)[number] | 'unset'

export function useDayTag(entryRef: useNextProgram_LibraryEntry$key): DayTag {
  const nextProgram = useNextProgram(entryRef)
  if (!nextProgram) {
    return 'unset'
  }

  return dayOfWeek[nextProgram.startAt.getDay()] ?? 'unset'
}
