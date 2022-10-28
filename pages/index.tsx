import {
  Accordion,
  Alert,
  Anchor,
  Avatar,
  Card,
  Center,
  Checkbox,
  Chip,
  Container,
  Group,
  Loader,
  Menu,
  SimpleGrid,
  Switch,
  Text,
  Title,
} from '@mantine/core'
import { IconAlertTriangle, IconBrandGithub, IconLogin, IconLogout } from '@tabler/icons'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { AnnictSignInButton } from '../components/AnnictSignInButton'
import { CheckboxWithHoverCard } from '../components/CheckboxWithHoverCard'
import { LibraryEntryFilter } from '../components/LibraryEntryFilter'
import { WorkCard } from '../components/WorkCard'
import { SeasonName } from '../graphql/annict/types'
import {
  dayFiltersState,
  enableSyobocalState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  syobocalChannelsState,
  timeFiltersState,
} from '../lib/atoms'
import { filterSayaChannel } from '../lib/services/saya'
import { AnnictClientProvider } from '../lib/useAnnictClient'
import { useAuthenticatedSession } from '../lib/useAuthenticatedSession'
import { useBrowserNotification } from '../lib/useBrowserNotification'
import { useLibraryEntries } from '../lib/useLibraryEntries'
import { LibraryEntryProvider } from '../lib/useLibraryEntry'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'
import { useSaya } from '../lib/useSaya'
import { useUpdateChecker } from '../lib/useUpdateChecker'
import packageJson from '../package.json'

import type { DayTag, TimeTag } from '../models/filters'

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
      </Center>
    </Container>
  )
}

export const IndexAsAnnictUser: React.FC = () => {
  const session = useAuthenticatedSession()
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [isOnlyCurrentSeason, setIsOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
  const [seasonFilters, setSeasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters, setTimeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters, setDayFilters] = useRecoilState(dayFiltersState)
  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)

  const saya = useSaya(enableSyobocal)
  const { entries, isLoading, isError, error } = useLibraryEntries()

  return (
    <Container>
      <Card shadow="sm" p="lg" radius="md" mb="xl" mt="xl" withBorder>
        <Card.Section>
          <Accordion chevronPosition="left">
            <Accordion.Item value="settings">
              <Accordion.Control>
                <Group position="apart">
                  <Text size="lg">{packageJson.name}</Text>
                  <Menu closeOnItemClick={false}>
                    <Menu.Target>
                      <Avatar src={session.user?.image ?? null} mr="md" />
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Label>{session.user?.name}</Menu.Label>
                      <Menu.Divider />
                      <Menu.Item
                        component={Switch}
                        label="ダークモード"
                        checked={colorScheme === 'dark'}
                        onChange={() => {
                          toggleColorScheme()
                        }}
                      />
                      <Menu.Divider />
                      <Menu.Item
                        icon={<IconLogout size={14} />}
                        color="red"
                        onClick={() => {
                          signOut().catch(console.error)
                        }}
                      >
                        ログアウト
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Group>
                  <Checkbox
                    ml="md"
                    mb="md"
                    label="今期に絞る"
                    checked={isOnlyCurrentSeason}
                    onChange={(event) => {
                      setIsOnlyCurrentSeason(event.target.checked)
                    }}
                  />
                  <CheckboxWithHoverCard
                    ml="md"
                    mb="md"
                    checked={enableSyobocal}
                    onChange={(event) => {
                      setEnableSyobocal(event.target.checked)
                    }}
                    label="しょぼいカレンダーも利用する"
                    description="有効にすると Annict に放送時間が登録されていない場合に「しょぼいカレンダー」のデータで代用します。"
                  />
                  <CheckboxWithHoverCard
                    ml="md"
                    mb="md"
                    checked={enableBrowserNotification}
                    onChange={(event) => {
                      setEnableBrowserNotification(event.target.checked)
                    }}
                    label="ブラウザの通知を有効にする"
                    description="有効にすると放送時間が近付いた時にブラウザの通知が表示されます。"
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
                        .distinctBy((c) => c.syobocalId)
                        .filter(filterSayaChannel)
                        .map((c) => (
                          <Chip key={c.syobocalId} value={c.syobocalId?.toString()} size="xs">
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
          {entries.map((entry) => (
            <LibraryEntryProvider key={entry.id} value={entry}>
              <LibraryEntryFilter>
                <WorkCard key={entry.id} shadow="sm" p="lg" radius="md" withBorder />
              </LibraryEntryFilter>
            </LibraryEntryProvider>
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
