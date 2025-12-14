import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// eslint-disable-next-line import-x/order
import '@mantine/core/styles.css'

export const metadata: Metadata = {
  title: 'annict-tracker',
  description: 'annict-tracker は、Annict での視聴記録を便利にする Web アプリケーションです。',
  metadataBase: new URL('https://annict-tracker.vercel.app'),
  openGraph: {
    title: 'annict-tracker',
    description: 'annict-tracker は、Annict での視聴記録を便利にする Web アプリケーションです。',
    url: 'https://annict-tracker.vercel.app',
  },
  alternates: {
    canonical: 'https://annict-tracker.pages.dev',
  },
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  )
}
