import {
  Alert,
  Anchor,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { IconAlertTriangle, IconBrandGithub, IconPhotoOff } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { format, secondsToMilliseconds } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'

import { DateBadge } from '../components/DateBadge'
import { RecordButton } from '../components/RecordButton'
import { RelativeTimeLabel } from '../components/RelativeTimeLabel'
import { SignInButton } from '../components/SignInButton'
import { SeasonName } from '../graphql/generated/types'
import { createAnnictClient } from '../lib/services/annict'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'
import { LibraryEntryModel } from '../models/LibraryEntryModel'
import packageJson from '../package.json'

import type { DayTag, TimeTag } from '../models/filters'

const Index: React.FC = () => {
  const { data: session } = useSession()

  if (session?.accessToken === undefined) {
    return (
      <>
        <Container mt="xl">
          <Center>
            <Card shadow="sm" p="xl" radius="md" mb="xl" mt="xl" withBorder>
              <Card.Section m="md" mt="xl" pt="md">
                <Title align="center">{packageJson.name}</Title>
              </Card.Section>

              <Text size="md" mb="lg">
                {packageJson.name} は Annict での視聴記録を便利にする Web アプリケーションです。
                <br />
                利用するには Annict でログインする必要があります。
              </Text>

              <SignInButton />

              <Text size="sm" color="dimmed" mt="lg">
                {packageJson.name} は現在開発中です。予期しない問題により正しく機能しないことがあります。
                <br />
                {packageJson.name} がユーザーの利用状況を収集することはありません。
                <br />
                ソースコードは{' '}
                <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
                  <IconBrandGithub size={16} /> GitHub
                </Anchor>{' '}
                で公開しています。
              </Text>
            </Card>
          </Center>
        </Container>
      </>
    )
  }

  return <AnnictSession accessToken={session.accessToken} />
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AnnictSession: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const client = useMemo(() => createAnnictClient(accessToken), [accessToken])

  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [isOnlyCurrentSeason, setIsOnlyCurrentSeason] = useLocalStorage({
    key: 'only-current-season',
    defaultValue: false,
  })
  const [seasonFilters, setSeasonFilters] = useLocalStorage<SeasonName[]>({
    key: 'season-filters',
    defaultValue: [SeasonName.Spring, SeasonName.Summer, SeasonName.Autumn, SeasonName.Winter],
  })
  const [timeFilters, setTimeFilters] = useLocalStorage<TimeTag[]>({
    key: 'time-filters',
    defaultValue: ['yesterday', 'today', 'tomorrow', 'finished'],
  })
  const [dayFilters, setDayFilters] = useLocalStorage<DayTag[]>({
    key: 'day-filters',
    defaultValue: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  })

  const {
    data: entries,
    isLoading,
    isError,
    error,
  } = useQuery(
    ['entries', accessToken],
    async () => {
      const response = await client.getViewerLibraryEntries()
      return (
        response.viewer?.libraryEntries?.nodes
          ?.filter((n): n is NonNullable<typeof n> => n !== null)
          ?.map((e) => new LibraryEntryModel(e))
          ?.sort((a, b) => a.sort - b.sort) ?? []
      )
    },
    {
      retry: true,
      retryDelay: secondsToMilliseconds(10),
      refetchInterval: secondsToMilliseconds(60),
    }
  )
  const filteredEntries = useMemo<LibraryEntryModel[]>(
    () =>
      entries
        ?.filter((e) => e.filterBySeasonName(seasonFilters))
        ?.filter((e) => e.filterByCurrentSeason(isOnlyCurrentSeason))
        ?.filter((e) => e.filterByTime(timeFilters))
        ?.filter((e) => e.filterByDay(dayFilters, timeFilters)) ?? [],
    [entries, seasonFilters, isOnlyCurrentSeason, timeFilters, dayFilters]
  )

  return (
    <Container>
      <Card shadow="sm" p="lg" radius="md" mb="xl" mt="xl" withBorder>
        <Card.Section>
          <Group>
            <Checkbox
              mt="md"
              ml="md"
              mb="md"
              label="ダークモード"
              checked={colorScheme === 'dark'}
              onChange={() => {
                toggleColorScheme()
              }}
            />
            <Checkbox
              mt="md"
              ml="md"
              mb="md"
              label="今期に絞る"
              checked={isOnlyCurrentSeason}
              onChange={(event) => {
                setIsOnlyCurrentSeason(event.target.checked)
              }}
            />
          </Group>

          <Checkbox.Group
            mt="md"
            ml="md"
            mb="md"
            label="シーズン"
            value={seasonFilters}
            onChange={(value) => {
              setSeasonFilters(value as SeasonName[])
            }}
          >
            <Checkbox value={SeasonName.Spring} label="春" />
            <Checkbox value={SeasonName.Summer} label="夏" />
            <Checkbox value={SeasonName.Autumn} label="秋" />
            <Checkbox value={SeasonName.Winter} label="冬" />
          </Checkbox.Group>

          <Checkbox.Group
            mt="md"
            ml="md"
            mb="md"
            label="放送日"
            value={timeFilters}
            onChange={(value) => {
              setTimeFilters(value as TimeTag[])
            }}
          >
            <Checkbox value="finished" label="昨日以前" />
            <Checkbox value="yesterday" label="昨日" />
            <Checkbox value="today" label="今日" />
            <Checkbox value="tomorrow" label="明日" />
            <Checkbox value="future" label="明日以降" />
            <Checkbox value="undetermined" label="未定" />
            <Checkbox value="unset" label="放送情報なし" />
          </Checkbox.Group>

          <Checkbox.Group
            mt="md"
            ml="md"
            mb="md"
            label="放送曜日"
            value={dayFilters}
            onChange={(value) => {
              setDayFilters(value as DayTag[])
            }}
          >
            <Checkbox value="sunday" label="日曜" />
            <Checkbox value="monday" label="月曜" />
            <Checkbox value="tuesday" label="火曜" />
            <Checkbox value="wednesday" label="水曜" />
            <Checkbox value="thursday" label="木曜" />
            <Checkbox value="friday" label="金曜" />
            <Checkbox value="saturday" label="土曜" />
          </Checkbox.Group>
        </Card.Section>
      </Card>

      {isLoading ? (
        <Center p="xl" m="xl">
          <Group>
            <Loader variant="dots" color="pink.6" />
            <Text>データ取得中です...</Text>
          </Group>
        </Center>
      ) : isError ? (
        <Alert icon={<IconAlertTriangle size={16} />} title="現在 Annict API を利用できません" color="red">
          {error?.toString()}
        </Alert>
      ) : (
        <>
          <SimpleGrid cols={3}>
            {filteredEntries.map((e) => (
              <Card key={e.id} shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={e.workImageUrl}
                    height={200}
                    alt={e.work.title}
                    withPlaceholder
                    placeholder={<IconPhotoOff />}
                  />
                </Card.Section>

                <Stack>
                  <Title order={4} style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} mt="sm">
                    <Anchor href={e.workUrl} target="_blank">
                      {e.work.title}
                    </Anchor>
                  </Title>

                  <Text weight={500} style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {e.nextEpisodeLabel}
                  </Text>

                  <Text style={{ whiteSpace: 'nowrap' }}>{e.nextProgram?.channel.name}</Text>

                  {e.nextProgramStartAt !== null && (
                    <Text>
                      {format(e.nextProgramStartAt, 'yyyy/MM/dd')} ({e.nextProgramStartAtDay}){' '}
                      {format(e.nextProgramStartAt, 'HH:mm')} (
                      <RelativeTimeLabel time={e.nextProgramStartAt} />)
                      <DateBadge entry={e} />
                    </Text>
                  )}

                  <Button.Group>
                    <RecordButton entry={e} client={client} />
                  </Button.Group>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </>
      )}

      <Card mt="md" mb="md">
        <Text>
          <Anchor href={packageJson.repository.url} target="_blank">
            {packageJson.name}
          </Anchor>{' '}
          made with &hearts; by{' '}
          <Anchor href="https://github.com/SlashNephy" target="_blank">
            @SlashNephy
          </Anchor>
          .
        </Text>
      </Card>
    </Container>
  )
}

export default Index
