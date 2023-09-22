import { recoilPersist } from 'recoil-persist'

function isServer(): boolean {
  return typeof window !== typeof undefined
}

export const { persistAtom } = recoilPersist({
  storage: isServer() ? window.localStorage : undefined,
})
