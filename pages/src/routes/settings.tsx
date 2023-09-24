import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Chip,
  ColorPicker,
  Container,
  Divider,
  Group,
  HoverCard,
  Radio,
  Stack,
  Switch,
  Text,
  TextInput,
  useMantineColorScheme,
} from '@mantine/core'
import {
  IconChecks,
  IconLogout,
  IconPaint,
  IconSettings,
  IconSparkles,
  IconTrash,
  IconUser,
  IconWorldWww,
} from '@tabler/icons-react'
import { useAtom } from 'jotai/index'
import React, { useMemo } from 'react'

import { CheckboxWithLabel } from '../components/common/CheckboxWithLabel.tsx'
import { AppLayout } from '../components/layout/AppLayout.tsx'
import { AnnictSignInButton } from '../components/tracker/AnnictSignInButton.tsx'
import { SignOutButton } from '../lib/auth/SignOutButton.tsx'
import { useAnnictSession } from '../lib/auth/useAnnictSession.ts'
import {
  enableAbemaIntegrationAtom,
  enableBandaiChannelIntegrationAtom,
  enableDanimeIntegrationAtom,
  enableDanimeNiconicoIntegrationAtom,
  enableEpgStationIntegrationAtom,
  enableEverythingIntegrationAtom,
  enableNetflixIntegrationAtom,
  enableNiconicoChannelIntegrationAtom,
  enablePrimeVideoIntegrationAtom,
  enableYouTubeIntegrationAtom,
  epgStationUrlAtom,
} from '../lib/jotai/integrations.ts'
import { enableBrowserNotificationAtom } from '../lib/jotai/notification.ts'
import { enableSyobocalAtom, syobocalChannelsAtom } from '../lib/jotai/syobocal.ts'
import { baseColorAtom } from '../lib/jotai/theme.ts'
import { useRequestNotificationPermission } from '../lib/notification/useRequestNotificationPermission.tsx'
import { filterSayaChannel } from '../lib/saya/filterSayaChannel.ts'
import { useSayaDatastore } from '../lib/saya/useSayaDatastore.ts'

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
              <ThemeSettings />
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

            <SignOutButton color="red" leftSection={<IconLogout size={14} />}>
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
  const [enableBrowserNotification, setEnableBrowserNotification] = useAtom(enableBrowserNotificationAtom)
  const requestNotificationPermission = useRequestNotificationPermission()

  return (
    <Stack>
      <Group>
        <IconSettings />
        <Text>一般設定</Text>
      </Group>

      <CheckboxWithLabel
        checked={enableBrowserNotification}
        description="放送時間が近付いたとき (約5分前) に放送予定の通知が表示されます。"
        label="ブラウザの通知を有効にする"
        onChange={(event) => {
          setEnableBrowserNotification(event.target.checked)
          if (event.target.checked) {
            requestNotificationPermission()
          }
        }}
      />
    </Stack>
  )
}

function ThemeSettings(): React.JSX.Element {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const [baseColor, setBaseColor] = useAtom(baseColorAtom)

  return (
    <Stack>
      <Group>
        <IconPaint />
        <Text>テーマ設定</Text>
      </Group>

      <Text>カラースキーム</Text>
      <Radio.Group value={colorScheme}>
        <Group>
          <Radio
            label="ライト"
            value="light"
            onClick={() => {
              setColorScheme('light')
            }}
          />
          <Radio
            label="ダーク"
            value="dark"
            onClick={() => {
              setColorScheme('dark')
            }}
          />
          <Radio
            label="OS と同期させる"
            value="auto"
            onClick={() => {
              setColorScheme('auto')
            }}
          />
        </Group>
      </Radio.Group>

      <Text>カスタムカラー</Text>
      <Text size="sm">UI の配色をお好きな色に変更できます。設定値はリロード後に反映されます。</Text>
      <Text size="sm">著しく可読性が低下するおそれがありますので、設定の際はご注意ください。</Text>
      <Center>
        <Group>
          <ColorPicker value={baseColor} onChange={setBaseColor} />
          <Stack>
            <Group>
              <Box bg={baseColor} h={20} w={20} />
              <Text>HEX: {baseColor}</Text>
            </Group>
            <Button
              onClick={() => {
                window.location.reload()
              }}
            >
              ページをリロード
            </Button>
          </Stack>
        </Group>
      </Center>
    </Stack>
  )
}

function IntegrationSettings(): React.JSX.Element {
  const [enableSyobocal, setEnableSyobocal] = useAtom(enableSyobocalAtom)
  const [syobocalChannels, setSyobocalChannels] = useAtom(syobocalChannelsAtom)
  const [enableEverythingIntegration, setEnableEverythingIntegration] = useAtom(enableEverythingIntegrationAtom)
  const [enableEpgStationIntegration, setEnableEpgStationIntegration] = useAtom(enableEpgStationIntegrationAtom)
  const [epgStationUrl, setEpgStationUrl] = useAtom(epgStationUrlAtom)
  const [enableDanimeIntegration, setEnableDanimeIntegration] = useAtom(enableDanimeIntegrationAtom)
  const [enableDanimeNiconicoIntegration, setEnableDanimeNiconicoIntegration] = useAtom(
    enableDanimeNiconicoIntegrationAtom
  )
  const [enableAbemaIntegration, setEnableAbemaIntegration] = useAtom(enableAbemaIntegrationAtom)
  const [enableNetflixIntegration, setEnableNetflixIntegration] = useAtom(enableNetflixIntegrationAtom)
  const [enablePrimeVideoIntegration, setEnablePrimeVideoIntegration] = useAtom(enablePrimeVideoIntegrationAtom)
  const [enableNiconicoChannelIntegration, setEnableNiconicoChannelIntegration] = useAtom(
    enableNiconicoChannelIntegrationAtom
  )
  const [enableBandaiChannelIntegration, setEnableBandaiChannelIntegration] = useAtom(
    enableBandaiChannelIntegrationAtom
  )
  const [enableYouTubeIntegration, setEnableYouTubeIntegration] = useAtom(enableYouTubeIntegrationAtom)

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
            label="EPGStation 統合で使用される URL"
            leftSection={<IconWorldWww />}
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
