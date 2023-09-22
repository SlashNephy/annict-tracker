import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Checkbox,
  Chip,
  Container,
  Divider,
  Group,
  HoverCard,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core'
import {
  IconChecks,
  IconLogout,
  IconSettings,
  IconSparkles,
  IconTrash,
  IconUser,
  IconWorldWww,
} from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { AnnictSignInButton } from '../components/AnnictSignInButton.tsx'
import { CheckboxWithLabel } from '../components/common/CheckboxWithLabel.tsx'
import { AppLayout } from '../components/layout/AppLayout.tsx'
import { SignOutButton } from '../lib/auth/SignOutButton.tsx'
import { useAnnictSession } from '../lib/auth/useAnnictSession.ts'
import {
  enableAbemaIntegrationState,
  enableBandaiChannelIntegrationState,
  enableDanimeIntegrationState,
  enableDanimeNiconicoIntegrationState,
  enableEpgStationIntegrationState,
  enableEverythingIntegrationState,
  enableNetflixIntegrationState,
  enableNiconicoChannelIntegrationState,
  enablePrimeVideoIntegrationState,
  enableYouTubeIntegrationState,
  epgStationUrlState,
} from '../lib/recoil/integrations.ts'
import { enableSyobocalState, syobocalChannelsState } from '../lib/recoil/syobocal.ts'
import { filterSayaChannel } from '../lib/saya/filterSayaChannel.ts'
import { useSayaDatastore } from '../lib/saya/useSayaDatastore.ts'
import { useBrowserNotification } from '../lib/useBrowserNotification.tsx'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme.ts'

export function Settings(): React.JSX.Element {
  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
            <Stack>
              <UserSettings />
              <Divider />
              <GeneralSettings />
              <Divider />
              <IntegrationSettings />
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}

function UserSettings(): React.JSX.Element {
  const session = useAnnictSession()

  return (
    <Stack>
      <Group>
        <IconUser />
        <Text>Annict アカウント</Text>
      </Group>

      <Group ml="xl" p="md">
        {session ? (
          <>
            <Avatar mr="md" src={session.user?.image ?? null} />

            <Text>{session.user?.name}</Text>

            <SignOutButton color="red" leftIcon={<IconLogout size={14} />}>
              ログアウト
            </SignOutButton>
          </>
        ) : (
          <>
            <Text>現在 Annict アカウントでログインしていません。</Text>

            <AnnictSignInButton />
          </>
        )}
      </Group>
    </Stack>
  )
}

function GeneralSettings(): React.JSX.Element {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()

  return (
    <Stack>
      <Group>
        <IconSettings />
        <Text>一般設定</Text>
      </Group>

      <Checkbox
        checked={colorScheme === 'dark'}
        label="ダークモードを有効にする"
        onChange={() => {
          toggleColorScheme()
        }}
      />

      <CheckboxWithLabel
        checked={enableBrowserNotification}
        description="放送時間が近付いたとき (約5分前) に放送予定の通知が表示されます。"
        label="ブラウザの通知を有効にする"
        onChange={(event) => {
          setEnableBrowserNotification(event.target.checked)
        }}
      />
    </Stack>
  )
}

function IntegrationSettings(): React.JSX.Element {
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)
  const [enableEverythingIntegration, setEnableEverythingIntegration] = useRecoilState(enableEverythingIntegrationState)
  const [enableEpgStationIntegration, setEnableEpgStationIntegration] = useRecoilState(enableEpgStationIntegrationState)
  const [epgStationUrl, setEpgStationUrl] = useRecoilState(epgStationUrlState)
  const [enableDanimeIntegration, setEnableDanimeIntegration] = useRecoilState(enableDanimeIntegrationState)
  const [enableDanimeNiconicoIntegration, setEnableDanimeNiconicoIntegration] = useRecoilState(
    enableDanimeNiconicoIntegrationState
  )
  const [enableAbemaIntegration, setEnableAbemaIntegration] = useRecoilState(enableAbemaIntegrationState)
  const [enableNetflixIntegration, setEnableNetflixIntegration] = useRecoilState(enableNetflixIntegrationState)
  const [enablePrimeVideoIntegration, setEnablePrimeVideoIntegration] = useRecoilState(enablePrimeVideoIntegrationState)
  const [enableNiconicoChannelIntegration, setEnableNiconicoChannelIntegration] = useRecoilState(
    enableNiconicoChannelIntegrationState
  )
  const [enableBandaiChannelIntegration, setEnableBandaiChannelIntegration] = useRecoilState(
    enableBandaiChannelIntegrationState
  )
  const [enableYouTubeIntegration, setEnableYouTubeIntegration] = useRecoilState(enableYouTubeIntegrationState)

  const saya = useSayaDatastore(enableSyobocal)
  const availableChannels = useMemo(
    () => saya?.definition.channels.distinctBy((c) => c.syobocalId).filter(filterSayaChannel) ?? [],
    [saya]
  )

  return (
    <Stack>
      <Group>
        <IconSparkles />
        <Text>外部サービスとの統合</Text>
      </Group>

      <Stack>
        <CheckboxWithLabel
          checked={enableSyobocal}
          description="Annict に放送時間が登録されていない場合に「しょぼいカレンダー」のデータで代用します。"
          label="しょぼいカレンダーを参照する"
          onChange={(event) => {
            setEnableSyobocal(event.target.checked)
          }}
        />

        {enableSyobocal && (
          <Stack pl="lg">
            <Group>
              <Text size="sm">しょぼいカレンダーで放送予定を代用するチャンネル</Text>
              <HoverCard shadow="md" width={280}>
                <HoverCard.Target>
                  <ActionIcon
                    variant="default"
                    onClick={() => {
                      setSyobocalChannels(
                        availableChannels
                          .map((x) => x.syobocalId?.toString())
                          .filter((x): x is NonNullable<typeof x> => x !== undefined)
                      )
                    }}
                  >
                    <IconChecks size={14} />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">すべてのチャンネルを選択します</Text>
                </HoverCard.Dropdown>
              </HoverCard>
              <HoverCard shadow="md" width={280}>
                <HoverCard.Target>
                  <ActionIcon
                    variant="default"
                    onClick={() => {
                      setSyobocalChannels([])
                    }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">チャンネルの選択をリセットします</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
            <Group mb="md" ml="md">
              <Chip.Group multiple value={syobocalChannels} onChange={setSyobocalChannels}>
                {Array.from(availableChannels.groupBy((c) => c.type).entries()).map(([type, channels]) => (
                  <Stack key={type}>
                    <Text>{type === 'GR' ? '地上波 / CATV' : type === 'SKY' ? 'スカパー!プレミアム' : type}</Text>
                    <Group>
                      {channels.map((c) => (
                        <Chip key={c.syobocalId} size="xs" value={c.syobocalId?.toString()}>
                          {c.name}
                        </Chip>
                      ))}
                    </Group>
                  </Stack>
                ))}
              </Chip.Group>
            </Group>
          </Stack>
        )}
      </Stack>

      <Stack>
        <Text size="sm">録画ファイルを以下のプロバイダー内で検索可能にします。</Text>

        <Switch
          checked={enableEverythingIntegration}
          description="録画ファイルを Everything (Windows) で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
          label="Everything"
          onChange={(event) => {
            setEnableEverythingIntegration(event.target.checked)
          }}
        />

        <Switch
          checked={enableEpgStationIntegration}
          description="録画ファイルを EPGStation で検索可能にします。ご自身で稼働させている EPGStation の URL を設定する必要があります。"
          label="EPGStation"
          onChange={(event) => {
            setEnableEpgStationIntegration(event.target.checked)
          }}
        />
        {/* XXX: recoil-persist で永続化しているため hydration error が発生する... (サーバーは常に enableEpgStationIntegration=false) */}
        {enableEpgStationIntegration && (
          <TextInput
            description="EPGStation トップページの URL を入力します。"
            icon={<IconWorldWww />}
            label="EPGStation 統合で使用される URL"
            pl="xl"
            placeholder="http://localhost:8888"
            value={epgStationUrl}
            onChange={(event) => {
              setEpgStationUrl(event.target.value)
            }}
          />
        )}
      </Stack>

      <Stack>
        <Text size="sm">作品を以下のストリーミングサービス内で検索可能にします。</Text>

        <Group>
          <Switch
            checked={enableDanimeIntegration}
            label="dアニメストア"
            onChange={(event) => {
              setEnableDanimeIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableDanimeNiconicoIntegration}
            label="dアニメストア ニコニコ支店"
            onChange={(event) => {
              setEnableDanimeNiconicoIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableAbemaIntegration}
            label="ABEMA"
            onChange={(event) => {
              setEnableAbemaIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableNetflixIntegration}
            label="Netflix"
            onChange={(event) => {
              setEnableNetflixIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enablePrimeVideoIntegration}
            label="Prime Video"
            onChange={(event) => {
              setEnablePrimeVideoIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableNiconicoChannelIntegration}
            label="ニコニコチャンネル"
            onChange={(event) => {
              setEnableNiconicoChannelIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableBandaiChannelIntegration}
            label="バンダイチャンネル"
            onChange={(event) => {
              setEnableBandaiChannelIntegration(event.target.checked)
            }}
          />

          <Switch
            checked={enableYouTubeIntegration}
            label="YouTube"
            onChange={(event) => {
              setEnableYouTubeIntegration(event.target.checked)
            }}
          />
        </Group>
      </Stack>
    </Stack>
  )
}
