import { Accordion, Avatar, Card, Chip, Group, Menu, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useRecoilState } from 'recoil'

import { CheckboxWithHoverCard } from './CheckboxWithHoverCard'
import { SeasonName } from '../graphql/annict/types'
import {
  dayFiltersState,
  hideRebroadcastingState,
  hideStreamingServicesState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  timeFiltersState,
} from '../lib/atoms'
import { useAuthenticatedSession } from '../lib/useAuthenticatedSession'
import packageJson from '../package.json'

import type { DayTag, TimeTag } from '../models/filters'
import type { CardProps } from '@mantine/core'

export const FilterCard: React.FC<Omit<CardProps, 'children'>> = (props) => {
  const session = useAuthenticatedSession()
  const [isOnlyCurrentSeason, setIsOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [hideRebroadcasting, setHideRebroadcasting] = useRecoilState(hideRebroadcastingState)
  const [hideStreamingServices, setHideStreamingServices] = useRecoilState(hideStreamingServicesState)
  const [seasonFilters, setSeasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters, setTimeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters, setDayFilters] = useRecoilState(dayFiltersState)

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
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  )
}
