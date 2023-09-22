import { atom } from 'recoil'

import { persistAtom } from './persist.ts'

export const isNavbarExpandState = atom<boolean>({
  key: 'isNavbarExpand',
  default: false,
  effects: [persistAtom],
})
