import { atomWithStorage } from 'jotai/utils'

export const enableSyobocalState = atomWithStorage('enableSyobocal', false)

export const syobocalChannelsState = atomWithStorage<string[]>('syobocalChannels', [])
