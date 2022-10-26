// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { SeasonName } from '../graphql/annict/types'

import type { DayTag, TimeTag } from '../models/filters'

const { persistAtom } = recoilPersist()

export const isOnlyCurrentSeasonState = atom<boolean>({
  key: 'only-current-season',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableSyobocalState = atom<boolean>({
  key: 'enable-syobocal',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const seasonFiltersState = atom<SeasonName[]>({
  key: 'season-filters',
  default: [SeasonName.Spring, SeasonName.Summer, SeasonName.Autumn, SeasonName.Winter],
  effects_UNSTABLE: [persistAtom],
})

export const timeFiltersState = atom<TimeTag[]>({
  key: 'time-filters',
  default: ['yesterday', 'today', 'tomorrow', 'finished'],
  effects_UNSTABLE: [persistAtom],
})

export const dayFiltersState = atom<DayTag[]>({
  key: 'day-filters',
  default: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  effects_UNSTABLE: [persistAtom],
})

export const syobocalChannelsState = atom<string[]>({
  key: 'syobocal-channels',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const enableBrowserNotificationState = atom<boolean>({
  key: 'enable-browser-notification',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const programNotificationThresholdMinutesState = atom<number>({
  key: 'program-notification-threshold-minutes',
  default: 5,
  effects_UNSTABLE: [persistAtom],
})
