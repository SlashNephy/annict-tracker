import { Card, Container, Group, Image, SimpleGrid, Text } from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

import { DateBadge } from '../components/DateBadge'
import { RecordButton } from '../components/RecordButton'
import { SignInButton } from '../components/SignInButton'
import { StatusState } from '../graphql/generated/types'
import { createAnnictClient } from '../lib/services/annict'

import type { Sdk } from '../graphql/generated/sdk'
import type { ViewerProgram } from '../lib/services/annict'

import '@slashnephy/typescript-extension'

const Index: React.FC = () => {
  const { data: session } = useSession()

  return (
    <Container>
      {session?.accessToken === undefined ? <SignInButton /> : <AnnictSession accessToken={session.accessToken} />}
    </Container>
  )
}

const AnnictSession: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const client: Sdk = useMemo(() => createAnnictClient(accessToken), [accessToken])

  const { data: programs } = useQuery<Map<number, ViewerProgram[]>>(
    [accessToken, client, 'programs'],
    async () => {
      const response = await client.getViewerPrograms()
      const schedules = response.viewer?.programs?.nodes
        ?.filter((p): p is NonNullable<typeof p> => p !== null)
        .filter((p) => p.work.viewerStatusState === StatusState.Watching)

      return schedules?.groupBy((p) => p.work.annictId) ?? new Map()
    },
    {
      initialData: () => new Map(),
    }
  )

  return (
    <SimpleGrid cols={3}>
      {Array.from(programs.values()).map(([p]) => (
        <Card key={p.id} shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            {typeof p.work.image?.recommendedImageUrl === 'string' ? (
              <Image src={p.work.image.recommendedImageUrl} height={200} alt={p.work.title} />
            ) : (
              <IconPhotoOff />
            )}
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text>{p.work.title}</Text>
            <Text weight={500}>
              {p.episode.numberText ?? `#${p.episode.number}`} {p.episode.title}
            </Text>
            <Text>{p.channel.name}</Text>
            <Text>
              {format(new Date(p.startedAt), 'yyyy/MM/dd HH:mm')} <DateBadge time={new Date(p.startedAt)} />
            </Text>
          </Group>

          <RecordButton program={p} client={client} />
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default Index
