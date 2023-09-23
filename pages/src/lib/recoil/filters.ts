import { atomWithStorage } from 'jotai/utils'

import type { DayTag } from '../annict/filters/useDayTag.ts'
import type { SeasonName } from '../annict/filters/useIsCurrentSeason.ts'
import type { TimeTag } from '../annict/filters/useTimeTag.ts'

export const showOnlyCurrentSeasonState = atomWithStorage('showOnlyCurrentSeason', false)

export const hideRebroadcastingState = atomWithStorage('hideRebroadcasting', false)

export const hideStreamingServicesState = atomWithStorage('hideStreamingServices', false)

export const seasonFiltersState = atomWithStorage<SeasonName[]>('seasonFilters', [
  'SPRING',
  'SUMMER',
  'AUTUMN',
  'WINTER',
])

export const timeFiltersState = atomWithStorage<TimeTag[]>('timeFilters', [
  'yesterday',
  'today',
  'tomorrow',
  'finished',
])

export const dayFiltersState = atomWithStorage<DayTag[]>('dayFilters', [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
])
