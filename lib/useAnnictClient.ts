import { createContext, useContext, useMemo } from 'react'

import { createAnnictClient } from './services/annict'

import type { Sdk } from '../graphql/generated/sdk'

const annictClientContext = createContext<string | undefined>(undefined)

export const AnnictClientProvider = annictClientContext.Provider

export const useAnnictClient = (): Sdk => {
  const accessToken = useContext(annictClientContext)
  if (accessToken === undefined) {
    throw new Error('accessToken is undefined.')
  }

  return useMemo(() => createAnnictClient(accessToken), [accessToken])
}
