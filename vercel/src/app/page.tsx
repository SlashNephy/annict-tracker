'use client'

import { Anchor, Card, CardSection, Container, Space, Text, Title } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { IconBrandGithub } from '@tabler/icons-react'
import { useEffect } from 'react'

import type { ReactNode } from 'react'

export default function Home(): ReactNode {
  const viewport = useViewportSize()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    const timeout = window.setTimeout(() => {
      window.location.replace('https://annict-tracker.pages.dev')
    }, 10000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <main>
      <Container>
        <Card
          withBorder
          miw={Math.min(500, viewport.width)}
          p="xl"
          radius="xs"
          shadow="sm"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <CardSection m="md" pb="md">
            <Title ta="center">annict-tracker</Title>
          </CardSection>

          <Text size="md">
            annict-tracker は Annict での視聴記録を便利にする Web アプリケーションです。
            <br />
            annict-tracker は Vercel から Cloudflare Pages に移転しました。
          </Text>

          <Space h="lg" />

          <Text>
            10秒後に
            {' '}
            <Anchor href="https://annict-tracker.pages.dev">annict-tracker.pages.dev</Anchor>
            {' '}
            に遷移します。
          </Text>

          <Space h="lg" />

          <Text>
            ソースコードは
            {' '}
            <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
              <IconBrandGithub size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              {' '}
              GitHub
            </Anchor>
            {' '}
            で公開しています。
          </Text>
        </Card>
      </Container>
    </main>
  )
}
