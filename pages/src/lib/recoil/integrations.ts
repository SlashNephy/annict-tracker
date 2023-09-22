import { atom, selector } from 'recoil'

import { persistAtom } from './persist.ts'

import type { RecoilState } from 'recoil'

export const enableEverythingIntegrationState = atom<boolean>({
  key: 'enableEverythingIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableEpgStationIntegrationState = atom<boolean>({
  key: 'enableEpgStationIntegration',
  default: false,
  effects: [persistAtom],
})

export const epgStationUrlState = atom<string>({
  key: 'epgstationUrl',
  default: 'http://localhost:8888',
  effects: [persistAtom],
})

export const enableDanimeIntegrationState = atom<boolean>({
  key: 'enableDanimeIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableDanimeNiconicoIntegrationState = atom<boolean>({
  key: 'enableDanimeNiconicoIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableAbemaIntegrationState = atom<boolean>({
  key: 'enableAbemaIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableNetflixIntegrationState = atom<boolean>({
  key: 'enableNetflixIntegration',
  default: false,
  effects: [persistAtom],
})

export const enablePrimeVideoIntegrationState = atom<boolean>({
  key: 'enablePrimeVideoIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableNiconicoChannelIntegrationState = atom<boolean>({
  key: 'enableNiconicoChannelIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableBandaiChannelIntegrationState = atom<boolean>({
  key: 'enableBandaiChannelIntegration',
  default: false,
  effects: [persistAtom],
})

export const enableYouTubeIntegrationState = atom<boolean>({
  key: 'enableYouTubeIntegration',
  default: false,
  effects: [persistAtom],
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
  key: 'effectiveIntegrationConfigs',
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
