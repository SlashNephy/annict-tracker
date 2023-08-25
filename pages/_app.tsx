import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import { useMemorableColorScheme } from '../lib/useMemorableColorScheme.ts'
import packageJson from '../package.json'

import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

// eslint-disable-next-line import/order
import '@slashnephy/typescript-extension'

const queryClient = new QueryClient()

export default function MyApp(props: AppProps<{ session: Session }>): React.JSX.Element {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props

  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      !window.location.href.startsWith('https://annict-tracker.vercel.app')
    ) {
      window.location.replace('https://annict-tracker.vercel.app')
    }
  }, [])

  return (
    <>
      <Head>
        <title>{packageJson.name}</title>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>

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
            <SessionProvider refetchOnWindowFocus={false} refetchWhenOffline={false} session={session}>
              <RecoilRoot>
                <Component {...pageProps} />
                <Analytics />
              </RecoilRoot>
            </SessionProvider>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
