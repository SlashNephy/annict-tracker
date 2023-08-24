// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { SeasonName } from '../graphql/annict/generated/graphql.ts'

import type { DayTag, TimeTag } from '../models/filters'

const { persistAtom } = recoilPersist()

export const isOnlyCurrentSeasonState = atom<boolean>({
  key: 'only-current-season',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const hideRebroadcastingState = atom<boolean>({
  key: 'hide-rebroadcasting',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const hideStreamingServicesState = atom<boolean>({
  key: 'hide-video-services',
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

export const notificationHistoriesState = atom<string[]>({
  key: 'notification-histories',
  default: [],
})

export const isNavbarExpandState = atom<boolean>({
  key: 'is-navbar-expand',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableEverythingIntegrationState = atom<boolean>({
  key: 'enable-everything-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableEpgStationIntegrationState = atom<boolean>({
  key: 'enable-epgstation-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const epgStationUrlState = atom<string>({
  key: 'epgstation-url',
  default: 'http://localhost:8888',
  effects_UNSTABLE: [persistAtom],
})

export type SearchIntegrationKey = 'everything' | 'epgstation'
type SearchIntegrationConfigBase = {
  key: SearchIntegrationKey
  isEnabled: boolean
}
type EverythingSearchIntegrationConfig = SearchIntegrationConfigBase & {
  key: 'everything'
}
type EpgStationSearchIntegrationConfig = SearchIntegrationConfigBase & {
  key: 'epgstation'
  url: string
}
export type SearchIntegrationConfig = EverythingSearchIntegrationConfig | EpgStationSearchIntegrationConfig

export const integrationConfigsState = selector<SearchIntegrationConfig[]>({
  key: 'integration-configs',
  get({ get }) {
    return [
      {
        key: 'everything' as const,
        isEnabled: get(enableEverythingIntegrationState),
      },
      {
        key: 'epgstation' as const,
        isEnabled: get(enableEpgStationIntegrationState),
        url: get(epgStationUrlState),
      },
    ]
  },
})
