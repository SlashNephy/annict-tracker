import { atomWithStorage } from 'jotai/utils'

export const enableEverythingIntegrationAtom = atomWithStorage('enableEverythingIntegration', false)

export const enableEpgStationIntegrationAtom = atomWithStorage('enableEpgStationIntegration', false)

export const epgStationUrlAtom = atomWithStorage('epgstationUrl', 'http://localhost:8888')

export const enableDanimeIntegrationAtom = atomWithStorage<boolean>('enableDanimeIntegration', false)

export const enableDanimeNiconicoIntegrationAtom = atomWithStorage('enableDanimeNiconicoIntegration', false)

export const enableAbemaIntegrationAtom = atomWithStorage('enableAbemaIntegration', false)

export const enableNetflixIntegrationAtom = atomWithStorage('enableNetflixIntegration', false)

export const enablePrimeVideoIntegrationAtom = atomWithStorage('enablePrimeVideoIntegration', false)

export const enableNiconicoChannelIntegrationAtom = atomWithStorage('enableNiconicoChannelIntegration', false)

export const enableBandaiChannelIntegrationAtom = atomWithStorage('enableBandaiChannelIntegration', false)

export const enableYouTubeIntegrationAtom = atomWithStorage('enableYouTubeIntegration', false)
