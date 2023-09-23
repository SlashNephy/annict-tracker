import { atomWithStorage } from 'jotai/utils'

// TODO: 名前を ~Atom に変える
export const isNavbarExpandState = atomWithStorage('isNavbarExpand', false)
