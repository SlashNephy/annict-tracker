import { atomWithStorage } from 'jotai/utils'

import type { DayOfWeek } from '../annict/dayOfWeek.ts'
import type { RelativeTimeGroup } from '../annict/relativeTimeGroups.ts'
import type { SeasonName } from '../annict/season.ts'
import type { WatchStatus } from '../annict/watchStatus.ts'

export const watchStatusFiltersAtom = atomWithStorage<WatchStatus[]>('watchStatusFilters', ['WATCHING'])

export const showOnlyCurrentSeasonAtom = atomWithStorage('showOnlyCurrentSeason', false)

export const hideRebroadcastingAtom = atomWithStorage('hideRebroadcasting', false)

export const hideStreamingServicesAtom = atomWithStorage('hideStreamingServices', false)

export const seasonFiltersAtom = atomWithStorage<SeasonName[]>('seasonFilters', [
  'SPRING',
  'SUMMER',
  'AUTUMN',
  'WINTER',
])

export const timeFiltersAtom = atomWithStorage<RelativeTimeGroup[]>('timeFilters', [
  'finished',
  'yesterday',
  'today',
  'tomorrow',
  'future',
  'undetermined',
])

export const dayFiltersAtom = atomWithStorage<DayOfWeek[]>('dayFilters', [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
])
