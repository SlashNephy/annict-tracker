import { useAtomValue } from 'jotai'

import {
  enableAbemaIntegrationState,
  enableBandaiChannelIntegrationState,
  enableDanimeIntegrationState,
  enableDanimeNiconicoIntegrationState,
  enableEpgStationIntegrationState,
  enableEverythingIntegrationState,
  enableNetflixIntegrationState,
  enableNiconicoChannelIntegrationState,
  enablePrimeVideoIntegrationState,
  enableYouTubeIntegrationState,
  epgStationUrlState,
} from '../../../lib/recoil/integrations.ts'

import type { Atom } from 'jotai'

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

export function useIntegrationConfigs(): EffectiveSearchIntegrationConfigs {
  const configs: EffectiveSearchIntegrationConfigs = {}
  const states: Record<SearchIntegrationKeyWithoutAdditionalConfig, Atom<boolean>> = {
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
    if (!useAtomValue(state)) {
      continue
    }

    // @ts-expect-error Object.entries() always return [string, T][]
    configs[key] = {
      key,
      isEnabled: true,
    }
  }

  if (useAtomValue(enableEpgStationIntegrationState)) {
    configs.epgstation = {
      key: 'epgstation',
      isEnabled: true,
      url: useAtomValue(epgStationUrlState),
    }
  }

  return configs
}
