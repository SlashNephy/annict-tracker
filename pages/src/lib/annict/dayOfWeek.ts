import { useNextProgram } from './useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const
export type DayOfWeek = (typeof daysOfWeek)[number]

export function useDayOfWeek(entryRef: useNextProgram_LibraryEntry$key): DayOfWeek | null {
  const nextProgram = useNextProgram(entryRef)
  if (!nextProgram) {
    return null
  }

  return daysOfWeek[nextProgram.startAt.getDay()] ?? null
}

export function getDayOfWeekLabel(day: DayOfWeek): string {
  switch (day) {
    case 'sunday':
      return '日曜'
    case 'monday':
      return '月曜'
    case 'tuesday':
      return '火曜'
    case 'wednesday':
      return '水曜'
    case 'thursday':
      return '木曜'
    case 'friday':
      return '金曜'
    case 'saturday':
      return '土曜'
  }
}
