import { atomWithStorage } from 'jotai/utils'

export const enableUpdateCheckAtom = atomWithStorage('enableUpdateCheck', true)

export const enableAutoUpdateAtom = atomWithStorage('enableAutoUpdate', false)
