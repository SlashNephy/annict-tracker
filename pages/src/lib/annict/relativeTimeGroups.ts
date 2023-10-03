import { add, endOfDay, isWithinInterval, startOfToday, startOfYesterday } from 'date-fns'

import { useNextProgram } from './useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export const relativeTimeGroups = ['finished', 'yesterday', 'today', 'tomorrow', 'future', 'undetermined'] as const
export type RelativeTimeGroup = (typeof relativeTimeGroups)[number]

// https://github.com/kiraka/annict-web/blob/853819f59a8adb1c0f41df19cbe3bf651d765fee/app/models/tv_time.rb
export function useRelativeTimeGroup(entryRef: useNextProgram_LibraryEntry$key): RelativeTimeGroup {
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

export function getRelativeTimeGroupLabel(group: RelativeTimeGroup): string {
  switch (group) {
    case 'finished':
      return '昨日以前'
    case 'yesterday':
      return '昨日'
    case 'today':
      return '今日'
    case 'tomorrow':
      return '明日'
    case 'future':
      return '明日以降'
    case 'undetermined':
      return '放送情報なし'
    default:
      throw new Error(`Unknown relative time group: ${group}`)
  }
}
