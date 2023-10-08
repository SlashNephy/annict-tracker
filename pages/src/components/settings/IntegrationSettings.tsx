import { ActionIcon, Chip, Group, Stack, Switch, Text, TextInput, Tooltip } from '@mantine/core'
import { IconChecks, IconSparkles, IconTrash, IconWorldWww } from '@tabler/icons-react'
import { produce } from 'immer'
import { useAtom } from 'jotai'
import { group, unique } from 'radash'
import React, { useCallback, useMemo } from 'react'

import { epgStationUrlAtom, searchIntegrationKeysAtom } from '../../lib/jotai/integrations.ts'
import { enableSyobocalAtom, syobocalChannelsAtom } from '../../lib/jotai/syobocal.ts'
import { useSayaDatastore } from '../../lib/saya/useSayaDatastore.ts'
import { CheckboxWithLabel } from '../common/CheckboxWithLabel.tsx'
import { getSearchIntegrationLabel, searchIntegrationKeys } from '../work/buttons/useIntegrationConfigs.ts'

import type { SearchIntegrationKey } from '../work/buttons/useIntegrationConfigs.ts'
import type { ChangeEventHandler, ChangeEvent } from 'react'

export function IntegrationSettings(): React.JSX.Element {
  const [enableSyobocal, setEnableSyobocal] = useAtom(enableSyobocalAtom)
  const [syobocalChannels, setSyobocalChannels] = useAtom(syobocalChannelsAtom)
  const [searchIntegrations, setSearchIntegrations] = useAtom(searchIntegrationKeysAtom)
  const [epgStationUrl, setEpgStationUrl] = useAtom(epgStationUrlAtom)

  const saya = useSayaDatastore(enableSyobocal)
  const availableChannels = useMemo(
    () => unique(saya?.definition.channels ?? [], (c) => c.syobocalId ?? 0).filter((c) => !!c.syobocalId),
    [saya]
  )
  const availableChannelIds = useMemo(
    () => availableChannels.map((c) => c.syobocalId?.toString()).filter((c): c is NonNullable<typeof c> => !!c),
    [availableChannels]
  )
  const isAllChannelsSelected = availableChannelIds.length === syobocalChannels.length

  const handleToggleAllChannelsButton = useCallback(() => {
    setSyobocalChannels(isAllChannelsSelected ? [] : availableChannelIds)
  }, [availableChannelIds, isAllChannelsSelected, setSyobocalChannels])
  const handleToggleIntegration = useCallback(
    (event: ChangeEvent<HTMLInputElement>, key: SearchIntegrationKey) => {
      return produce(searchIntegrations, (draft) => {
        if (event.target.checked) {
          draft.push(key)
        } else {
          const index = draft.indexOf(key)
          if (index !== -1) {
            draft.splice(index, 1)
          }
        }
      })
    },
    [searchIntegrations]
  )
  const handleToggleEverythingIntegration: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchIntegrations(handleToggleIntegration(event, 'everything'))
    },
    [handleToggleIntegration, setSearchIntegrations]
  )
  const handleToggleEpgStationIntegration: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchIntegrations(handleToggleIntegration(event, 'epgstation'))
    },
    [handleToggleIntegration, setSearchIntegrations]
  )
  const handleChangeEpgStationUrl: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setEpgStationUrl(event.target.value)
    },
    [setEpgStationUrl]
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
          onToggle={setEnableSyobocal}
        />

        {enableSyobocal && (
          <Stack pl="lg">
            <Group>
              <Text size="sm">しょぼいカレンダーで放送予定を代用するチャンネル</Text>
              <Tooltip
                label={isAllChannelsSelected ? 'すべてのチャンネルを解除します' : 'すべてのチャンネルを選択します'}
              >
                <ActionIcon variant="default" onClick={handleToggleAllChannelsButton}>
                  {isAllChannelsSelected ? <IconTrash size={14} /> : <IconChecks size={14} />}
                </ActionIcon>
              </Tooltip>
            </Group>
            <Group mb="md" ml="md">
              <Chip.Group multiple value={syobocalChannels} onChange={setSyobocalChannels}>
                {Object.entries(group(availableChannels, (c) => c.type)).map(([type, channels]) => {
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
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={() => {
                              setSyobocalChannels(
                                produce(syobocalChannels, (draft) => {
                                  if (isAllSelected) {
                                    return draft.filter((c) => !channelIds.includes(c))
                                  }

                                  return unique([...draft, ...channelIds])
                                })
                              )
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
          checked={searchIntegrations.includes('everything')}
          description="録画ファイルを Everything (Windows) で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
          label="Everything"
          onChange={handleToggleEverythingIntegration}
        />

        <Switch
          checked={searchIntegrations.includes('epgstation')}
          description="録画ファイルを EPGStation で検索可能にします。ご自身で稼働させている EPGStation の URL を設定する必要があります。"
          label="EPGStation"
          onChange={handleToggleEpgStationIntegration}
        />
        {searchIntegrations.includes('epgstation') && (
          <TextInput
            description="EPGStation トップページの URL を入力します。"
            label="EPGStation 統合で使用される URL"
            leftSection={<IconWorldWww />}
            pl="xl"
            placeholder="http://localhost:8888"
            value={epgStationUrl}
            onChange={handleChangeEpgStationUrl}
          />
        )}
      </Stack>

      <Stack>
        <Text size="sm">作品を以下のストリーミングサービス内で検索可能にします。</Text>

        <Switch.Group value={searchIntegrations} onChange={setSearchIntegrations}>
          <Group>
            {searchIntegrationKeys.slice(2).map((key) => (
              <Switch key={key} label={getSearchIntegrationLabel(key)} value={key} />
            ))}
          </Group>
        </Switch.Group>
      </Stack>
    </Stack>
  )
}
