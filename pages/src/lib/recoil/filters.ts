import { atom } from 'recoil'

import { persistAtom } from './persist.ts'

import type { DayTag } from '../annict/filters/useDayTag.ts'
import type { SeasonName } from '../annict/filters/useIsCurrentSeason.ts'
import type { TimeTag } from '../annict/filters/useTimeTag.ts'

export const showOnlyCurrentSeasonState = atom<boolean>({
  key: 'showOnlyCurrentSeason',
  default: false,
  effects: [persistAtom],
})

export const hideRebroadcastingState = atom<boolean>({
  key: 'hideRebroadcasting',
  default: false,
  effects: [persistAtom],
})

export const hideStreamingServicesState = atom<boolean>({
  key: 'hideStreamingServices',
  default: false,
  effects: [persistAtom],
})

export const seasonFiltersState = atom<SeasonName[]>({
  key: 'seasonFilters',
  default: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'],
  effects: [persistAtom],
})

export const timeFiltersState = atom<TimeTag[]>({
  key: 'timeFilters',
  default: ['yesterday', 'today', 'tomorrow', 'finished'],
  effects: [persistAtom],
})

export const dayFiltersState = atom<DayTag[]>({
  key: 'dayFilters',
  default: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  effects: [persistAtom],
})
