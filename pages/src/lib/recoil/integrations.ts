import { atomWithStorage } from 'jotai/utils'

export const enableEverythingIntegrationState = atomWithStorage('enableEverythingIntegration', false)

export const enableEpgStationIntegrationState = atomWithStorage('enableEpgStationIntegration', false)

export const epgStationUrlState = atomWithStorage('epgstationUrl', 'http://localhost:8888')

export const enableDanimeIntegrationState = atomWithStorage<boolean>('enableDanimeIntegration', false)

export const enableDanimeNiconicoIntegrationState = atomWithStorage('enableDanimeNiconicoIntegration', false)

export const enableAbemaIntegrationState = atomWithStorage('enableAbemaIntegration', false)

export const enableNetflixIntegrationState = atomWithStorage('enableNetflixIntegration', false)

export const enablePrimeVideoIntegrationState = atomWithStorage('enablePrimeVideoIntegration', false)

export const enableNiconicoChannelIntegrationState = atomWithStorage('enableNiconicoChannelIntegration', false)

export const enableBandaiChannelIntegrationState = atomWithStorage('enableBandaiChannelIntegration', false)

export const enableYouTubeIntegrationState = atomWithStorage('enableYouTubeIntegration', false)
