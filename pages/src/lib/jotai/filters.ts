import { atomWithStorage } from 'jotai/utils'

import type { StatusState } from '../../__generated__/LibraryGrid_PaginationQuery.graphql.ts'
import type { DayOfWeek } from '../annict/filters/useDayTag.ts'
import type { TimeTag } from '../annict/filters/useTimeTag.ts'
import type { SeasonName } from '../annict/getSeasonOf.ts'

export const stateFiltersAtom = atomWithStorage<StatusState[]>('stateFilters', ['WATCHING'])

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

export const dayFiltersAtom = atomWithStorage<DayOfWeek[]>('dayFilters', [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
])
