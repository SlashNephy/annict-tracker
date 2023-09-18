import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { RecoilRoot } from 'recoil'

import { ErrorPage } from './components/error/ErrorPage.tsx'
import { useMemorableColorScheme } from './lib/useMemorableColorScheme.ts'

import type { PropsWithChildren } from 'react'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

const queryClient = new QueryClient()

export function App({ children }: PropsWithChildren): React.JSX.Element {
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
          <QueryClientProvider client={queryClient}>
            <RecoilRoot>{children}</RecoilRoot>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ErrorBoundary>
  )
}
