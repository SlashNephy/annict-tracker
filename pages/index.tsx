import { Anchor, Card, Center, Container, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconLogin } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import React from 'react'

import { AnnictSignInButton } from '../components/AnnictSignInButton'
import { AppLayout } from '../components/AppLayout'
import { FilterCard } from '../components/FilterCard'
import { FooterCard } from '../components/FooterCard'
import { LibraryGrid } from '../components/LibraryGrid'
import { AnnictClientProvider } from '../lib/useAnnictClient'
import packageJson from '../package.json'

export function IndexAsGuestUser(): React.ReactElement {
  return (
    <Container mt="xl">
      <Center>
        <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
          <Card.Section m="md" mt="xl" pt="md">
            <Title align="center">{packageJson.name}</Title>
          </Card.Section>

          <Text mb="lg" size="md">
            {packageJson.name} は Annict での視聴記録を便利にする Web アプリケーションです。
            <br />
            利用するには Annict でログインする必要があります。
          </Text>

          <AnnictSignInButton fullWidth color="pink.6" leftIcon={<IconLogin />} />

          <Text color="dimmed" mt="lg" size="sm">
            {packageJson.name} は現在開発中です。予期しない問題により正しく機能しないことがあります。
            <br />
            {packageJson.name} はユーザー情報を収集することはありませんが、
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

export function IndexAsAnnictUser(): React.ReactElement {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <LibraryGrid col={{ xs: 12, sm: 6, md: 4, lg: 3 }} grid={{ gutter: 'xl' }} />
      <FooterCard mb="md" mt="md" />
    </Container>
  )
}

function Index(): React.ReactElement {
  const { data } = useSession()

  return (
    <AppLayout>
      {data?.accessToken !== undefined ? (
        <AnnictClientProvider value={data.accessToken}>
          <IndexAsAnnictUser />
        </AnnictClientProvider>
      ) : (
        <IndexAsGuestUser />
      )}
    </AppLayout>
  )
}

export default Index
