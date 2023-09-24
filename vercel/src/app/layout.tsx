import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import React from 'react'

import type { Metadata } from 'next'

// eslint-disable-next-line import/order
import '@mantine/core/styles.css'

export const metadata: Metadata = {
  title: 'annict-tracker',
  description: 'annict-tracker は、Annict での視聴記録を便利にする Web アプリケーションです。',
  openGraph: {
    title: 'annict-tracker',
    description: 'annict-tracker は、Annict での視聴記録を便利にする Web アプリケーションです。',
    url: 'https://annict-tracker.pages.dev',
  },
}

export type RootLayoutProps = {
  children: React.JSX.Element
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  )
}
