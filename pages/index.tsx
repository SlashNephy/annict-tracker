import { Anchor, Card, Container, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconLogin } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import React from 'react'

import { AnnictSignInButton } from '../components/AnnictSignInButton'
import { FilterCard } from '../components/FilterCard'
import { FooterCard } from '../components/FooterCard'
import { LibraryGrid } from '../components/LibraryGrid'
import { AnnictClientProvider } from '../lib/useAnnictClient'
import { useUpdateChecker } from '../lib/useUpdateChecker'
import packageJson from '../package.json'

const Index: React.FC = () => {
  const { data } = useSession()
  useUpdateChecker()

  return data?.accessToken !== undefined ? (
    <AnnictClientProvider value={data.accessToken}>
      <IndexAsAnnictUser />
    </AnnictClientProvider>
  ) : (
    <IndexAsGuestUser />
  )
}

export const IndexAsGuestUser: React.FC = () => {
  return (
    <Container mt="xl">
      <Card shadow="sm" p="xl" radius="md" mb="xl" mt="xl" withBorder>
        <Card.Section m="md" mt="xl" pt="md">
          <Title align="center">{packageJson.name}</Title>
        </Card.Section>

        <Text size="md" mb="lg">
          {packageJson.name} は Annict での視聴記録を便利にする Web アプリケーションです。
          <br />
          利用するには Annict でログインする必要があります。
        </Text>

        <AnnictSignInButton fullWidth color="pink.6" leftIcon={<IconLogin />} />

        <Text size="sm" color="dimmed" mt="lg">
          {packageJson.name} は現在開発中です。予期しない問題により正しく機能しないことがあります。
          <br />
          {packageJson.name} はユーザー情報を収集することはありませんが
          <br />
          アプリケーションの改善のためにパフォーマンス情報は収集する場合があります。
          <br />
          ソースコードは{' '}
          <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
            <IconBrandGithub size={16} /> GitHub
          </Anchor>{' '}
          で公開しています。
        </Text>
      </Card>
    </Container>
  )
}

export const IndexAsAnnictUser: React.FC = () => {
  return (
    <Container>
      <FilterCard shadow="sm" p="lg" radius="md" mb="xl" mt="xl" withBorder />
      <LibraryGrid cols={3} />
      <FooterCard mt="md" mb="md" />
    </Container>
  )
}

export default Index
