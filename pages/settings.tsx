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
  Text,
} from '@mantine/core'
import { IconChecks, IconTrash } from '@tabler/icons'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { AppLayout } from '../components/AppLayout'
import { CheckboxWithLabel } from '../components/CheckboxWithLabel'
import { enableEverythingIntegrationState, enableSyobocalState, syobocalChannelsState } from '../lib/atoms'
import { filterSayaChannel } from '../lib/services/saya'
import { useBrowserNotification } from '../lib/useBrowserNotification'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'
import { useSaya } from '../lib/useSaya'

const Settings: React.FC = () => {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
  const [enableEverythingIntegration, setEnableEverythingIntegration] = useRecoilState(enableEverythingIntegrationState)

  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)
  const saya = useSaya(enableSyobocal)
  const availableChannels = useMemo(() => {
    return saya?.definition.channels.distinctBy((c) => c.syobocalId).filter(filterSayaChannel) ?? []
  }, [saya])

  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card shadow="sm" p="xl" radius="md" mb="xl" mt="xl" withBorder>
            <Stack>
              <Checkbox
                checked={colorScheme === 'dark'}
                onChange={() => {
                  toggleColorScheme()
                }}
                label="ダークモードを有効にする"
              />

              <CheckboxWithLabel
                checked={enableSyobocal}
                onChange={(event) => {
                  setEnableSyobocal(event.target.checked)
                }}
                label="しょぼいカレンダーを参照する"
                description="Annict に放送時間が登録されていない場合に「しょぼいカレンダー」のデータで代用します。"
              />

              <CheckboxWithLabel
                checked={enableBrowserNotification}
                onChange={(event) => {
                  setEnableBrowserNotification(event.target.checked)
                }}
                label="ブラウザの通知を有効にする"
                description="放送時間が近付いた時に放送予定の通知が表示されます。"
              />

              <CheckboxWithLabel
                checked={enableEverythingIntegration}
                onChange={(event) => {
                  setEnableEverythingIntegration(event.target.checked)
                }}
                label="Everything 統合を有効にする"
                description="録画ファイルを Everything で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
              />
            </Stack>

            <Divider m="md" />

            <Stack>
              <Group>
                <Text>しょぼいカレンダーで参照するチャンネル</Text>
                <HoverCard width={280} shadow="md">
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
                <HoverCard width={280} shadow="md">
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
              <Chip.Group mt="md" ml="md" mb="md" value={syobocalChannels} multiple onChange={setSyobocalChannels}>
                {availableChannels.map((c) => (
                  <Chip key={c.syobocalId} value={c.syobocalId?.toString()} size="xs">
                    {c.name}
                  </Chip>
                ))}
              </Chip.Group>
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}

export default Settings
