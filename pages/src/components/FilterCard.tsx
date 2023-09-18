import { Accordion, Card, Chip, Group, Text } from '@mantine/core'
import React from 'react'
import { useRecoilState } from 'recoil'

import { CheckboxWithHoverCard } from './CheckboxWithHoverCard.tsx'
import {
  dayFiltersState,
  hideRebroadcastingState,
  hideStreamingServicesState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  timeFiltersState,
} from '../lib/atoms.ts'

import type { SeasonName } from '../__generated__/useLibraryEntries_getViewerQuery.graphql.ts'
import type { DayTag, TimeTag } from '../models/filters.ts'
import type { CardProps } from '@mantine/core'

export function FilterCard(props: Omit<CardProps, 'children'>): React.JSX.Element {
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
          <Accordion.Item style={{ border: 'unset' }} value="settings">
            <Accordion.Control>
              <Text size="lg">annict-tracker</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Group>
                <CheckboxWithHoverCard
                  checked={isOnlyCurrentSeason}
                  description="現在のシーズンに放送中の作品だけを表示します。"
                  label="今期に絞る"
                  mb="md"
                  ml="md"
                  onChange={(event) => {
                    setIsOnlyCurrentSeason(event.target.checked)
                  }}
                />
                <CheckboxWithHoverCard
                  checked={hideRebroadcasting}
                  description="再放送の放送予定を非表示にします。"
                  label="再放送を除く"
                  mb="md"
                  ml="md"
                  onChange={(event) => {
                    setHideRebroadcasting(event.target.checked)
                  }}
                />
                <CheckboxWithHoverCard
                  checked={hideStreamingServices}
                  description="Annict でサポートされている動画サービスの放送予定を非表示にします。"
                  label="配信サービスを除く"
                  mb="md"
                  ml="md"
                  onChange={(event) => {
                    setHideStreamingServices(event.target.checked)
                  }}
                />
              </Group>

              <Text>シーズン</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group
                  multiple
                  value={seasonFilters}
                  onChange={(value) => {
                    setSeasonFilters(value as SeasonName[])
                  }}
                >
                  <Chip value="SPRING">春</Chip>
                  <Chip value="SUMMER">夏</Chip>
                  <Chip value="AUTHMN">秋</Chip>
                  <Chip value="WINTER">冬</Chip>
                </Chip.Group>
              </Group>

              <Text>放送時間</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group
                  multiple
                  value={timeFilters}
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
              </Group>

              <Text>放送曜日</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group
                  multiple
                  value={dayFilters}
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
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  )
}
