import { Anchor, Card, Center, Container, Text, Title } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import React from 'react'

import { AnnictSignInButton } from '../AnnictSignInButton.tsx'

export function GuestUser(): React.JSX.Element {
  return (
    <Container mt="xl">
      <Center>
        <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
          <Card.Section m="md" mt="xl" pt="md">
            <Title ta="center">annict-tracker</Title>
          </Card.Section>

          <Text mb="lg" size="md">
            annict-tracker は Annict での視聴記録を便利にする Web アプリケーションです。
            <br />
            利用するには Annict アカウントでログインする必要があります。
          </Text>

          <AnnictSignInButton />

          <Text c="dimmed" mt="lg" size="sm">
            annict-tracker は現在開発中です。予期しない問題により正しく機能しないことがあります。
            <br />
            annict-tracker はユーザー情報を収集することはありませんが、
            <br />
            アプリケーションの改善のため、パフォーマンス情報やバグレポートを収集する場合があります。
            <br />
            ソースコードは{' '}
            <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
              <IconBrandGithub size={16} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> GitHub
            </Anchor>{' '}
            で公開しています。
          </Text>
        </Card>
      </Center>
    </Container>
  )
}
