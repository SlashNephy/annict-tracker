import { atom } from 'recoil'

import { persistAtom } from './persist.ts'

export const enableSyobocalState = atom<boolean>({
  key: 'enableSyobocal',
  default: false,
  effects: [persistAtom],
})

export const syobocalChannelsState = atom<string[]>({
  key: 'syobocalChannels',
  default: [],
  effects: [persistAtom],
})
