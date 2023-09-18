import { Anchor, Card, Center, Container, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconLogin } from '@tabler/icons-react'
import React from 'react'
import { RelayEnvironmentProvider } from 'react-relay'

import { AnnictSignInButton } from '../components/AnnictSignInButton.tsx'
import { FilterCard } from '../components/FilterCard.tsx'
import { FooterCard } from '../components/FooterCard.tsx'
import { AppLayout } from '../components/layout/AppLayout.tsx'
import { LibraryGrid } from '../components/LibraryGrid.tsx'
import { useAnnictSession } from '../lib/auth/annict/useAnnictSession.ts'
import { getAnnictEnvironment } from '../lib/relay/environment.ts'

function IndexAsGuestUser(): React.JSX.Element {
  return (
    <Container mt="xl">
      <Center>
        <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
          <Card.Section m="md" mt="xl" pt="md">
            <Title align="center">annict-tracker</Title>
          </Card.Section>

          <Text mb="lg" size="md">
            annict-tracker は Annict での視聴記録を便利にする Web アプリケーションです。
            <br />
            利用するには Annict でログインする必要があります。
          </Text>

          <AnnictSignInButton fullWidth color="pink.6" leftIcon={<IconLogin />} />

          <Text color="dimmed" mt="lg" size="sm">
            annict-tracker は現在開発中です。予期しない問題により正しく機能しないことがあります。
            <br />
            annict-tracker はユーザー情報を収集することはありませんが、
            <br />
            アプリケーションの改善のためにパフォーマンス情報は収集する場合があります。
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

function IndexAsAnnictUser(): React.JSX.Element {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <LibraryGrid col={{ xs: 12, sm: 6, md: 4, lg: 3 }} grid={{ gutter: 'xl' }} />
      <FooterCard mb="md" mt="md" />
    </Container>
  )
}

export function Index(): React.JSX.Element {
  const session = useAnnictSession()

  return (
    <AppLayout>
      {session?.accessToken ? (
        <RelayEnvironmentProvider environment={getAnnictEnvironment(session.accessToken)}>
          <IndexAsAnnictUser />
        </RelayEnvironmentProvider>
      ) : (
        <IndexAsGuestUser />
      )}
    </AppLayout>
  )
}
