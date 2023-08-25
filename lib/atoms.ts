// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { SeasonName } from '../graphql/annict/generated/graphql.ts'

import type { DayTag, TimeTag } from '../models/filters'
import type { RecoilState } from 'recoil'

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

export const enableDanimeIntegrationState = atom<boolean>({
  key: 'enable-danime-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableDanimeNiconicoIntegrationState = atom<boolean>({
  key: 'enable-danime-niconico-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableAbemaIntegrationState = atom<boolean>({
  key: 'enable-abema-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableNetflixIntegrationState = atom<boolean>({
  key: 'enable-netflix-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enablePrimeVideoIntegrationState = atom<boolean>({
  key: 'enable-prime-video-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableNiconicoChannelIntegrationState = atom<boolean>({
  key: 'enable-niconico_channel-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableBandaiChannelIntegrationState = atom<boolean>({
  key: 'enable-bandai-channel-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const enableYouTubeIntegrationState = atom<boolean>({
  key: 'enable-youtube-integration',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export type SearchIntegrationKey =
  | 'everything'
  | 'epgstation'
  | 'd_anime'
  | 'd_anime_niconico'
  | 'abema'
  | 'netflix'
  | 'prime_video'
  | 'niconico_channel'
  | 'bandai_channel'
  | 'youtube'
type SearchIntegrationKeyWithAdditionalConfig = 'epgstation'
type SearchIntegrationKeyWithoutAdditionalConfig = Exclude<
  SearchIntegrationKey,
  SearchIntegrationKeyWithAdditionalConfig
>
type GeneralSearchIntegrationConfig<K extends SearchIntegrationKey> = {
  key: K
  isEnabled: boolean
}
type EpgStationSearchIntegrationConfig = GeneralSearchIntegrationConfig<'epgstation'> & {
  url: string
}
export type SearchIntegrationConfig<K extends SearchIntegrationKey> =
  K extends SearchIntegrationKeyWithoutAdditionalConfig
    ? GeneralSearchIntegrationConfig<K>
    : K extends 'epgstation'
    ? EpgStationSearchIntegrationConfig
    : never
export type EffectiveSearchIntegrationConfigs = { [K in SearchIntegrationKey]?: SearchIntegrationConfig<K> }

export const effectiveIntegrationConfigsState = selector<EffectiveSearchIntegrationConfigs>({
  key: 'effective-integration-configs',
  get({ get }) {
    const configs: EffectiveSearchIntegrationConfigs = {}

    const states: Record<SearchIntegrationKeyWithoutAdditionalConfig, RecoilState<boolean>> = {
      everything: enableEverythingIntegrationState,
      d_anime: enableDanimeIntegrationState,
      d_anime_niconico: enableDanimeNiconicoIntegrationState,
      abema: enableAbemaIntegrationState,
      netflix: enableNetflixIntegrationState,
      prime_video: enablePrimeVideoIntegrationState,
      niconico_channel: enableNiconicoChannelIntegrationState,
      bandai_channel: enableBandaiChannelIntegrationState,
      youtube: enableYouTubeIntegrationState,
    }

    for (const [key, state] of Object.entries(states)) {
      if (!get(state)) {
        continue
      }

      // @ts-expect-error Object.entries() always return [string, T][]
      configs[key] = {
        key,
        isEnabled: true,
      }
    }

    if (get(enableEpgStationIntegrationState)) {
      configs.epgstation = {
        key: 'epgstation',
        isEnabled: true,
        url: get(epgStationUrlState),
      }
    }

    return configs
  },
})
