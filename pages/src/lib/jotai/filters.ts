import { atomWithStorage } from 'jotai/utils'

import type { DayTag } from '../annict/filters/useDayTag.ts'
import type { TimeTag } from '../annict/filters/useTimeTag.ts'
import type { SeasonName } from '../annict/getSeasonOf.ts'

export const showOnlyCurrentSeasonAtom = atomWithStorage('showOnlyCurrentSeason', false)

export const hideRebroadcastingAtom = atomWithStorage('hideRebroadcasting', false)

export const hideStreamingServicesAtom = atomWithStorage('hideStreamingServices', false)

export const seasonFiltersAtom = atomWithStorage<SeasonName[]>('seasonFilters', [
  'SPRING',
  'SUMMER',
  'AUTUMN',
  'WINTER',
])

export const timeFiltersAtom = atomWithStorage<TimeTag[]>('timeFilters', [
  'finished',
  'yesterday',
  'today',
  'tomorrow',
  'future',
  'undetermined',
])

export const dayFiltersAtom = atomWithStorage<DayTag[]>('dayFilters', [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
])
