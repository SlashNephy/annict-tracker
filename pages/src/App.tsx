import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
// @ts-expect-error 型定義ファイルはあるけど exports されていない
import createCacheProvider from '@piotr-cz/swr-idb-cache'
import { Provider } from 'jotai'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import usePromise from 'react-use-promise'
import { SWRConfig } from 'swr'

import { ErrorPage } from './components/error/ErrorPage.tsx'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

// eslint-disable-next-line import/order
import '@mantine/core/styles.css'

export type AppProps = {
  children: React.JSX.Element
}

export function App({ children }: AppProps): React.JSX.Element {
  const [cacheProvider] = usePromise(
    () =>
      createCacheProvider({
        dbName: 'annict-tracker',
        storeName: 'swr-cache',
      }),
    []
  )

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <Notifications limit={3} position="bottom-right" />
        <SWRConfig value={{ provider: cacheProvider, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <Provider>{children}</Provider>
        </SWRConfig>
      </MantineProvider>
    </ErrorBoundary>
  )
}
