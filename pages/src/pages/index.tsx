import { Anchor, Card, Center, Container, Text, Title } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { AnnictSignInButton } from '../components/AnnictSignInButton.tsx'
import { LoadingSpinner } from '../components/common/LoadingSpinner.tsx'
import { ErrorPage } from '../components/error/ErrorPage.tsx'
import { FilterCard } from '../components/FilterCard.tsx'
import { FooterCard } from '../components/FooterCard.tsx'
import { AppLayout } from '../components/layout/AppLayout.tsx'
import { LibraryGrid } from '../components/LibraryGrid.tsx'
import { useAnnictSession } from '../lib/auth/useAnnictSession.ts'
import { AnnictRelayEnvironment } from '../lib/relay/AnnictRelayEnvironment.tsx'

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
            利用するには Annict アカウントでログインする必要があります。
          </Text>

          <AnnictSignInButton />

          <Text color="dimmed" mt="lg" size="sm">
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

function IndexAsAnnictUser(): React.JSX.Element {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorPage error={error} title="現在 Annict API を利用できません" />}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <LibraryGrid />
        </Suspense>
      </ErrorBoundary>
      <FooterCard mb="md" mt="md" />
    </Container>
  )
}

export function Index(): React.JSX.Element {
  const session = useAnnictSession()

  return (
    <AppLayout>
      {session?.accessToken ? (
        <AnnictRelayEnvironment bearerToken={session.accessToken}>
          <IndexAsAnnictUser />
        </AnnictRelayEnvironment>
      ) : (
        <IndexAsGuestUser />
      )}
    </AppLayout>
  )
}
