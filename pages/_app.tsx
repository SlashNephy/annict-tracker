import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'

import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'

import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

const queryClient = new QueryClient()

const MyApp: React.FC<AppProps<{ session: Session }>> = ({ Component, pageProps: { session, ...pageProps } }) => {
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
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

export default MyApp
