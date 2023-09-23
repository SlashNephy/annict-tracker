import { atomWithStorage } from 'jotai/utils'

export const enableSyobocalAtom = atomWithStorage('enableSyobocal', false)

export const syobocalChannelsAtom = atomWithStorage<string[]>('syobocalChannels', [])
