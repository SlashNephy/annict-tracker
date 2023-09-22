import { add, endOfDay, isWithinInterval, startOfToday, startOfYesterday } from 'date-fns'

import { useNextProgram } from '../useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

// TODO: unset 廃止
export type TimeTag = 'yesterday' | 'today' | 'tomorrow' | 'finished' | 'future' | 'undetermined' | 'unset'

// https://github.com/kiraka/annict-web/blob/853819f59a8adb1c0f41df19cbe3bf651d765fee/app/models/tv_time.rb
export function useTimeTag(entryRef: useNextProgram_LibraryEntry$key): TimeTag {
  const nextProgram = useNextProgram(entryRef)
  if (!nextProgram) {
    return 'undetermined'
  }

  const now = new Date()
  const beginningOfToday = now.getHours() <= 4 ? startOfYesterday() : startOfToday()
  if (
    isWithinInterval(nextProgram.startAt, {
      start: add(beginningOfToday, { days: -1, hours: 5 }),
      end: add(endOfDay(beginningOfToday), { days: -1, hours: 5 }),
    })
  ) {
    return 'yesterday'
  }

  if (
    isWithinInterval(nextProgram.startAt, {
      start: add(beginningOfToday, { hours: 5 }),
      end: add(endOfDay(beginningOfToday), { hours: 5 }),
    })
  ) {
    return 'today'
  }

  if (
    isWithinInterval(nextProgram.startAt, {
      start: add(beginningOfToday, { days: 1, hours: 5 }),
      end: add(endOfDay(beginningOfToday), { days: 1, hours: 5 }),
    })
  ) {
    return 'tomorrow'
  }

  if (nextProgram.startAt < add(beginningOfToday, { days: -1, hours: 5 })) {
    return 'finished'
  }

  return 'future'
}
