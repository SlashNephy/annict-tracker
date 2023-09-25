import { ActionIcon, Chip, Group, Stack, Switch, Text, TextInput, Tooltip } from '@mantine/core'
import { IconChecks, IconSparkles, IconTrash, IconWorldWww } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import React, { useMemo } from 'react'

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
} from '../../lib/jotai/integrations.ts'
import { enableSyobocalAtom, syobocalChannelsAtom } from '../../lib/jotai/syobocal.ts'
import { useSayaDatastore } from '../../lib/saya/useSayaDatastore.ts'
import { CheckboxWithLabel } from '../common/CheckboxWithLabel.tsx'

export function IntegrationSettings(): React.JSX.Element {
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
    () => saya?.definition.channels.distinctBy((c) => c.syobocalId).filter((c) => !!c.syobocalId) ?? [],
    [saya]
  )
  const availableChannelIds = useMemo(
    () => availableChannels.map((c) => c.syobocalId?.toString()).filter((c): c is NonNullable<typeof c> => !!c),
    [availableChannels]
  )
  const isAllChannelsSelected = availableChannelIds.length === syobocalChannels.length

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
              <Tooltip
                label={isAllChannelsSelected ? 'すべてのチャンネルを解除します' : 'すべてのチャンネルを選択します'}
              >
                <ActionIcon
                  variant="default"
                  onClick={() => {
                    if (isAllChannelsSelected) {
                      setSyobocalChannels([])
                    } else {
                      setSyobocalChannels(availableChannelIds)
                    }
                  }}
                >
                  {isAllChannelsSelected ? <IconTrash size={14} /> : <IconChecks size={14} />}
                </ActionIcon>
              </Tooltip>
            </Group>
            <Group mb="md" ml="md">
              <Chip.Group multiple value={syobocalChannels} onChange={setSyobocalChannels}>
                {Array.from(availableChannels.groupBy((c) => c.type).entries()).map(([type, channels]) => {
                  const typeName = type === 'GR' ? '地上波 / CATV' : type === 'SKY' ? 'スカパー!プレミアム' : type
                  const channelIds = channels
                    .map((c) => c.syobocalId?.toString())
                    .filter((c): c is NonNullable<typeof c> => !!c)
                  const isAllSelected =
                    channelIds.filter((c) => syobocalChannels.includes(c)).length === channels.length

                  return (
                    <Stack key={type}>
                      <Group>
                        <Text>{typeName}</Text>
                        <Tooltip
                          label={
                            isAllSelected
                              ? `${typeName} のすべてのチャンネルを解除します`
                              : `${typeName} のすべてのチャンネルを選択します`
                          }
                        >
                          <ActionIcon
                            variant="default"
                            onClick={() => {
                              if (isAllSelected) {
                                setSyobocalChannels((prev) => prev.filter((c) => !channelIds.includes(c)))
                              } else {
                                setSyobocalChannels((prev) => [...prev, ...channelIds].distinct())
                              }
                            }}
                          >
                            {isAllSelected ? <IconTrash size={14} /> : <IconChecks size={14} />}
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                      <Group>
                        {channels.map((c) => (
                          <Chip key={c.syobocalId} size="xs" value={c.syobocalId?.toString()}>
                            {c.name}
                          </Chip>
                        ))}
                      </Group>
                    </Stack>
                  )
                })}
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
