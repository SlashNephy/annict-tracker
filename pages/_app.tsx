import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import Head from 'next/head'
import React from 'react'

import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'

import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
          }}
        >
          <NotificationsProvider position="bottom-right" limit={3}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default MyApp
