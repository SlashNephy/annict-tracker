import { createGetInitialProps } from '@mantine/next'
import Document, { Main, NextScript, Html, Head } from 'next/document'
import React from 'react'

const getInitialProps = createGetInitialProps()

export default class MyDocument extends Document {
  public static getInitialProps = getInitialProps

  public render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link href="/favicon.ico" rel="icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
