import { ActionIcon, Card, Center, Checkbox, Chip, Container, Group, HoverCard, Stack, Text } from '@mantine/core'
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

function Settings(): React.ReactElement {
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
  const [enableEverythingIntegration, setEnableEverythingIntegration] = useRecoilState(enableEverythingIntegrationState)

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
                description="録画ファイルを Everything で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
                label="Everything 統合を有効にする"
                onChange={(event) => {
                  setEnableEverythingIntegration(event.target.checked)
                }}
              />
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}

export default Settings
