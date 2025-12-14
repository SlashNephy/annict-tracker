import { useAtomValue } from 'jotai'

import { epgStationUrlAtom, searchIntegrationKeysAtom } from '../../../lib/jotai/integrations.ts'

export const searchIntegrationKeys = [
  'everything',
  'epgstation',
  'd_anime',
  'd_anime_niconico',
  'abema',
  'netflix',
  'prime_video',
  'niconico_channel',
  'bandai_channel',
  'youtube',
] as const

export type SearchIntegrationKey = (typeof searchIntegrationKeys)[number]

export function getSearchIntegrationLabel(key: SearchIntegrationKey): string {
  switch (key) {
    case 'everything':
      return 'Everything'
    case 'epgstation':
      return 'EPGStation'
    case 'd_anime':
      return 'dアニメストア'
    case 'd_anime_niconico':
      return 'dアニメストア ニコニコ支店'
    case 'abema':
      return 'ABEMA'
    case 'netflix':
      return 'Netflix'
    case 'prime_video':
      return 'Prime Video'
    case 'niconico_channel':
      return 'ニコニコチャンネル'
    case 'bandai_channel':
      return 'バンダイチャンネル'
    case 'youtube':
      return 'YouTube'
    default:
      throw new Error(`unknown search integration key: ${key}`)
  }
}

type GeneralSearchIntegrationConfig<K extends SearchIntegrationKey> = {
  key: K
}
export type SearchIntegrationConfig<K extends SearchIntegrationKey> = K extends 'epgstation'
  ? GeneralSearchIntegrationConfig<'epgstation'> & {
    url: string
  }
  : GeneralSearchIntegrationConfig<K>
export type EffectiveSearchIntegrationConfigs = { [K in SearchIntegrationKey]?: SearchIntegrationConfig<K> }

export function useIntegrationConfigs(): EffectiveSearchIntegrationConfigs {
  const configs: EffectiveSearchIntegrationConfigs = {}

  const integrations = useAtomValue(searchIntegrationKeysAtom)
  for (const key of integrations) {
    if (key === 'epgstation') {
      configs.epgstation = {
        key: 'epgstation',
        url: useAtomValue(epgStationUrlAtom),
      }
      continue
    }

    // @ts-expect-error key is SearchIntegrationKeyWithoutAdditionalConfig
    configs[key] = {
      key,
    }
  }

  return configs
}
