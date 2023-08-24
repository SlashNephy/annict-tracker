import {
  ActionIcon,
  Card,
  Center,
  Checkbox,
  Chip,
  Container,
  Group,
  HoverCard,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { IconChecks, IconTrash, IconWorldWww } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { AppLayout } from '../components/AppLayout.tsx'
import { CheckboxWithLabel } from '../components/CheckboxWithLabel.tsx'
import {
  enableEpgStationIntegrationState,
  enableEverythingIntegrationState,
  enableSyobocalState,
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

              <CheckboxWithLabel
                checked={enableEverythingIntegration}
                description="録画ファイルを Everything (Windows) で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
                label="Everything 統合を有効にする"
                onChange={(event) => {
                  setEnableEverythingIntegration(event.target.checked)
                }}
              />

              <CheckboxWithLabel
                checked={enableEpgStationIntegration}
                description="録画ファイルを EPGStation で検索可能にします。EPGStation の URL を設定する必要があります。"
                label="EPGStation 統合を有効にする"
                onChange={(event) => {
                  setEnableEpgStationIntegration(event.target.checked)
                }}
              />
              {enableEpgStationIntegration && (
                <TextInput
                  description="トップページの URL を入力します。"
                  icon={<IconWorldWww />}
                  label="EPGStation の URL"
                  placeholder="http://localhost:8888"
                  value={epgStationUrl}
                  onChange={(event) => {
                    setEpgStationUrl(event.target.value)
                  }}
                />
              )}
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}
