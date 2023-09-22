import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

import { ErrorPage } from './components/error/ErrorPage.tsx'
import { useMemorableColorScheme } from './lib/useMemorableColorScheme.ts'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

export type AppProps = {
  children: React.JSX.Element
}

export function App({ children }: AppProps): React.JSX.Element {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <Notifications limit={3} position="bottom-right" />
          {/* TODO: TTL 付きのキャッシュストアを実装する */}
          <SWRConfig value={{ revalidateOnFocus: false, revalidateOnReconnect: false }}>
            <RecoilRoot>{children}</RecoilRoot>
          </SWRConfig>
        </MantineProvider>
      </ColorSchemeProvider>
    </ErrorBoundary>
  )
}
