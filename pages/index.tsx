import {
  Accordion,
  ActionIcon,
  Alert,
  Anchor,
  Button,
  Card,
  Center,
  Checkbox,
  Chip,
  Container,
  Group,
  HoverCard,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { IconAlertTriangle, IconBrandGithub, IconInfoCircle } from '@tabler/icons'
import { useQuery } from '@tanstack/react-query'
import { secondsToMilliseconds } from 'date-fns'
import { useSession } from 'next-auth/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { NextProgramInfo } from '../components/NextProgramInfo'
import { RecordButton } from '../components/RecordButton'
import { SignInButton } from '../components/SignInButton'
import { WorkImage } from '../components/WorkImage'
import { SeasonName } from '../graphql/generated/types'
import {
  dayFiltersState,
  enableSyobocalState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  syobocalChannelsState,
  timeFiltersState,
} from '../lib/atoms'
import { createAnnictClient } from '../lib/services/annict'
import { fetchSayaRemoteDatabase } from '../lib/services/saya'
import { useBrowserNotification } from '../lib/useBrowserNotification'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'
import { LibraryEntryModel } from '../models/LibraryEntryModel'
import packageJson from '../package.json'

import type { DayTag, TimeTag } from '../models/filters'

const Index: React.FC = () => {
  const { data: session } = useSession()
  return session?.accessToken !== undefined ? (
    <IndexAsAnnictUser accessToken={session.accessToken} />
  ) : (
    <IndexAsGuestUser />
  )
}

export const IndexAsGuestUser: React.FC = () => {
  return (
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
  )
}

export const IndexAsAnnictUser: React.FC<{ accessToken: string }> = ({ accessToken }) => {
  const client = useMemo(() => createAnnictClient(accessToken), [accessToken])
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [isOnlyCurrentSeason, setIsOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
  const [seasonFilters, setSeasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters, setTimeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters, setDayFilters] = useRecoilState(dayFiltersState)
  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)

  const { data: saya } = useQuery(['saya'], async () => await fetchSayaRemoteDatabase())
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
          <Accordion>
            <Accordion.Item value="settings">
              <Accordion.Control>{packageJson.name}</Accordion.Control>
              <Accordion.Panel>
                <Group>
                  <Checkbox
                    ml="md"
                    mb="md"
                    label="ダークモード"
                    checked={colorScheme === 'dark'}
                    onChange={() => {
                      toggleColorScheme()
                    }}
                  />
                  <Checkbox
                    ml="md"
                    mb="md"
                    label="今期に絞る"
                    checked={isOnlyCurrentSeason}
                    onChange={(event) => {
                      setIsOnlyCurrentSeason(event.target.checked)
                    }}
                  />

                  <Checkbox
                    ml="md"
                    mb="md"
                    label={
                      <>
                        しょぼいカレンダーも利用する
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <ActionIcon
                              variant="transparent"
                              ml="0.1em"
                              style={{ display: 'inline-block', verticalAlign: 'middle' }}
                            >
                              <IconInfoCircle size={16} />
                            </ActionIcon>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">
                              有効にすると Annict
                              に放送時間が登録されていない場合に「しょぼいカレンダー」のデータで代用します。
                            </Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </>
                    }
                    checked={enableSyobocal}
                    onChange={(event) => {
                      setEnableSyobocal(event.target.checked)
                    }}
                  />

                  <Checkbox
                    ml="md"
                    mb="md"
                    label={
                      <>
                        ブラウザの通知を有効にする
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <ActionIcon
                              variant="transparent"
                              ml="0.1em"
                              style={{ display: 'inline-block', verticalAlign: 'middle' }}
                            >
                              <IconInfoCircle size={16} />
                            </ActionIcon>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">有効にすると放送時間が近付いた時にブラウザの通知が表示されます。</Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </>
                    }
                    checked={enableBrowserNotification}
                    onChange={(event) => {
                      setEnableBrowserNotification(event.target.checked)
                    }}
                  />
                </Group>

                <Text>シーズン</Text>
                <Chip.Group
                  mt="md"
                  ml="md"
                  mb="md"
                  value={seasonFilters}
                  multiple
                  onChange={(value) => {
                    setSeasonFilters(value as SeasonName[])
                  }}
                >
                  <Chip value={SeasonName.Spring}>春</Chip>
                  <Chip value={SeasonName.Summer}>夏</Chip>
                  <Chip value={SeasonName.Autumn}>秋</Chip>
                  <Chip value={SeasonName.Winter}>冬</Chip>
                </Chip.Group>

                <Text>放送時間</Text>
                <Chip.Group
                  mt="md"
                  ml="md"
                  mb="md"
                  value={timeFilters}
                  multiple
                  onChange={(value) => {
                    setTimeFilters(value as TimeTag[])
                  }}
                >
                  <Chip value="finished">昨日以前</Chip>
                  <Chip value="yesterday">昨日</Chip>
                  <Chip value="today">今日</Chip>
                  <Chip value="tomorrow">明日</Chip>
                  <Chip value="future">明日以降</Chip>
                  <Chip value="undetermined">未定</Chip>
                  <Chip value="unset">放送情報なし</Chip>
                </Chip.Group>

                <Text>放送曜日</Text>
                <Chip.Group
                  mt="md"
                  ml="md"
                  mb="md"
                  value={dayFilters}
                  multiple
                  onChange={(value) => {
                    setDayFilters(value as DayTag[])
                  }}
                >
                  <Chip value="sunday">日曜</Chip>
                  <Chip value="monday">月曜</Chip>
                  <Chip value="tuesday">火曜</Chip>
                  <Chip value="wednesday">水曜</Chip>
                  <Chip value="thursday">木曜</Chip>
                  <Chip value="friday">金曜</Chip>
                  <Chip value="saturday">土曜</Chip>
                </Chip.Group>

                {enableSyobocal && (
                  <>
                    <Text>チャンネル</Text>
                    <Chip.Group
                      mt="md"
                      ml="md"
                      mb="md"
                      value={syobocalChannels}
                      multiple
                      onChange={setSyobocalChannels}
                    >
                      {saya?.definition.channels
                        .filter((c) => c.syobocalId !== undefined)
                        .distinctBy((c) => c.syobocalId)
                        .map((c) => (
                          <Chip key={c.name} value={c.syobocalId?.toString()} size="xs">
                            {c.name}
                          </Chip>
                        ))}
                    </Chip.Group>
                  </>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
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
        <SimpleGrid cols={3}>
          {filteredEntries.map((e) => (
            <Card key={e.id} shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <WorkImage entry={e} />
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

                <NextProgramInfo entry={e} />

                <Button.Group>
                  <RecordButton entry={e} client={client} />
                </Button.Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
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
