import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ErrorBoundary } from '@sentry/react'
import React, { useCallback } from 'react'
import { SWRConfig } from 'swr'

import { ErrorPage } from './components/error/ErrorPage.tsx'
import { useCustomTheme } from './lib/mantine/useCustomTheme.ts'

import type { FallbackRender } from '@sentry/react'

// eslint-disable-next-line import/order
import '@mantine/core/styles.css'
// eslint-disable-next-line import/order
import '@mantine/notifications/styles.css'

export type AppProps = {
  children: React.JSX.Element
}

export function App({ children }: AppProps): React.JSX.Element {
  const theme = useCustomTheme()

  const fallbackRender: FallbackRender = useCallback(({ error }) => {
    return <ErrorPage error={error} />
  }, [])

  return (
    <ErrorBoundary fallback={fallbackRender}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto" theme={theme}>
        <Notifications limit={3} position="bottom-right" />
        <SWRConfig>{children}</SWRConfig>
      </MantineProvider>
    </ErrorBoundary>
  )
}
