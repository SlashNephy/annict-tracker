import {
  ActionIcon,
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
import { IconChecks, IconSparkles, IconTrash, IconWorldWww } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { AppLayout } from '../components/AppLayout.tsx'
import { CheckboxWithLabel } from '../components/CheckboxWithLabel.tsx'
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
  enableSyobocalState,
  enableYouTubeIntegrationState,
  epgStationUrlState,
  syobocalChannelsState,
} from '../lib/atoms.ts'
import { filterSayaChannel } from '../lib/services/saya.ts'
import { useBrowserNotification } from '../lib/useBrowserNotification.tsx'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme.ts'
import { useSaya } from '../lib/useSaya.ts'

export default function Settings(): React.ReactElement {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
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

  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)
  const saya = useSaya(enableSyobocal)
  const availableChannels = useMemo(
    () => saya?.definition.channels.distinctBy((c) => c.syobocalId).filter(filterSayaChannel) ?? [],
    [saya]
  )

  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
            <Stack>
              <Checkbox
                checked={colorScheme === 'dark'}
                label="ダークモードを有効にする"
                onChange={() => {
                  toggleColorScheme()
                }}
              />

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
                    <Chip.Group multiple mb="md" ml="md" value={syobocalChannels} onChange={setSyobocalChannels}>
                      {availableChannels.map((c) => (
                        <Chip key={c.syobocalId} size="xs" value={c.syobocalId?.toString()}>
                          {c.name}
                        </Chip>
                      ))}
                    </Chip.Group>
                  </Stack>
                )}
              </Stack>

              <CheckboxWithLabel
                checked={enableBrowserNotification}
                description="放送時間が近付いた時に放送予定の通知が表示されます。"
                label="ブラウザの通知を有効にする"
                onChange={(event) => {
                  setEnableBrowserNotification(event.target.checked)
                }}
              />

              <Divider />

              <Group>
                <Stack>
                  <Group>
                    <IconSparkles />
                    <Text>外部サービスとの統合</Text>
                  </Group>
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
              </Group>
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}
