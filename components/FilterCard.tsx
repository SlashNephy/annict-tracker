import { Accordion, ActionIcon, Avatar, Card, Chip, Group, HoverCard, Menu, Switch, Text } from '@mantine/core'
import { IconChecks, IconLogout, IconTrash } from '@tabler/icons'
import { signOut } from 'next-auth/react'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { SeasonName } from '../graphql/annict/types'
import {
  dayFiltersState,
  enableEverythingIntegrationState,
  enableSyobocalState,
  hideRebroadcastingState,
  hideStreamingServicesState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  syobocalChannelsState,
  timeFiltersState,
} from '../lib/atoms'
import { filterSayaChannel } from '../lib/services/saya'
import { useAuthenticatedSession } from '../lib/useAuthenticatedSession'
import { useBrowserNotification } from '../lib/useBrowserNotification'
import { useMemorableColorScheme } from '../lib/useMemorableColorScheme'
import { useSaya } from '../lib/useSaya'
import packageJson from '../package.json'
import { CheckboxWithHoverCard } from './CheckboxWithHoverCard'

import type { DayTag, TimeTag } from '../models/filters'
import type { CardProps } from '@mantine/core'

export const FilterCard: React.FC<Omit<CardProps, 'children'>> = (props) => {
  const session = useAuthenticatedSession()
  const [colorScheme, toggleColorScheme] = useMemorableColorScheme()
  const [isOnlyCurrentSeason, setIsOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [hideRebroadcasting, setHideRebroadcasting] = useRecoilState(hideRebroadcastingState)
  const [hideStreamingServices, setHideStreamingServices] = useRecoilState(hideStreamingServicesState)
  const [enableSyobocal, setEnableSyobocal] = useRecoilState(enableSyobocalState)
  const [enableBrowserNotification, setEnableBrowserNotification] = useBrowserNotification()
  const [enableEverythingIntegration, setEnableEverythingIntegration] = useRecoilState(enableEverythingIntegrationState)
  const [seasonFilters, setSeasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters, setTimeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters, setDayFilters] = useRecoilState(dayFiltersState)
  const [syobocalChannels, setSyobocalChannels] = useRecoilState(syobocalChannelsState)

  const saya = useSaya(enableSyobocal)
  const availableChannels = useMemo(() => {
    return saya?.definition.channels.distinctBy((c) => c.syobocalId).filter(filterSayaChannel) ?? []
  }, [saya])

  return (
    <Card {...props}>
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
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={isOnlyCurrentSeason}
                  onChange={(event) => {
                    setIsOnlyCurrentSeason(event.target.checked)
                  }}
                  label="今期に絞る"
                  description="現在のシーズンに放送中の作品だけを表示します。"
                />
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={hideRebroadcasting}
                  onChange={(event) => {
                    setHideRebroadcasting(event.target.checked)
                  }}
                  label="再放送を除く"
                  description="再放送の放送予定を非表示にします。"
                />
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={hideStreamingServices}
                  onChange={(event) => {
                    setHideStreamingServices(event.target.checked)
                  }}
                  label="配信サービスを除く"
                  description="Annict でサポートされている動画サービスの放送予定を非表示にします。"
                />
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={enableSyobocal}
                  onChange={(event) => {
                    setEnableSyobocal(event.target.checked)
                  }}
                  label="しょぼいカレンダーも利用する"
                  description="Annict に放送時間が登録されていない場合に「しょぼいカレンダー」のデータで代用します。"
                />
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={enableBrowserNotification}
                  onChange={(event) => {
                    setEnableBrowserNotification(event.target.checked)
                  }}
                  label="ブラウザの通知を有効にする"
                  description="放送時間が近付いた時にブラウザの通知が表示されます。"
                />
                <CheckboxWithHoverCard
                  ml="md"
                  mb="md"
                  checked={enableEverythingIntegration}
                  onChange={(event) => {
                    setEnableEverythingIntegration(event.target.checked)
                  }}
                  label="Everything 統合を有効にする"
                  description="録画ファイルを Everything で検索可能にします。Everything の設定で「URLプロトコル」を有効にする必要があります。"
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
                  <Group>
                    <Text>チャンネル</Text>
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
                </>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  )
}
