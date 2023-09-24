// @ts-expect-error XXX: 型定義ファイルはあるけど exports されていない
import createCacheProvider from '@piotr-cz/swr-idb-cache'
import { Provider } from 'jotai/index'
import React from 'react'
import usePromise from 'react-use-promise'
import { SWRConfig } from 'swr'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type SWRCacheProviderProps = {
  children: React.JSX.Element
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SWRCacheProvider({ children }: SWRCacheProviderProps): React.JSX.Element {
  const [cacheProvider] = usePromise(
    () =>
      createCacheProvider({
        dbName: 'annict-tracker',
        storeName: 'swr-cache',
      }),
    []
  )

  return (
    <SWRConfig value={{ provider: cacheProvider }}>
      <Provider>{children}</Provider>
    </SWRConfig>
  )
}
