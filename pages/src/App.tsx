import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { Provider } from 'jotai'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { SWRConfig } from 'swr'

import { ErrorPage } from './components/error/ErrorPage.tsx'
import { useCustomTheme } from './lib/mantine/useCustomTheme.ts'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

// eslint-disable-next-line import/order
import '@mantine/core/styles.css'

export type AppProps = {
  children: React.JSX.Element
}

export function App({ children }: AppProps): React.JSX.Element {
  const theme = useCustomTheme()

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Notifications limit={3} position="bottom-right" />
        <SWRConfig>
          <Provider>{children}</Provider>
        </SWRConfig>
      </MantineProvider>
    </ErrorBoundary>
  )
}
