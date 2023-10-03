import { Accordion, Card, Chip, Group, Text } from '@mantine/core'
import { useAtom } from 'jotai'
import React from 'react'

import { daysOfWeek, getDayOfWeekLabel } from '../../lib/annict/filters/useDayTag.ts'
import { getTimeTagLabel, timeTags } from '../../lib/annict/filters/useTimeTag.ts'
import { getSeasonLabel, seasonNames } from '../../lib/annict/getSeasonOf.ts'
import {
  dayFiltersAtom,
  hideRebroadcastingAtom,
  hideStreamingServicesAtom,
  seasonFiltersAtom,
  showOnlyCurrentSeasonAtom,
  timeFiltersAtom,
} from '../../lib/jotai/filters.ts'
import { CheckboxWithHoverCard } from '../common/CheckboxWithHoverCard.tsx'

import type { DayOfWeek } from '../../lib/annict/filters/useDayTag.ts'
import type { TimeTag } from '../../lib/annict/filters/useTimeTag.ts'
import type { SeasonName } from '../../lib/annict/getSeasonOf.ts'
import type { CardProps } from '@mantine/core'

export function FilterCard(props: Omit<CardProps, 'children'>): React.JSX.Element {
  const [showOnlyCurrentSeason, setShowOnlyCurrentSeason] = useAtom(showOnlyCurrentSeasonAtom)
  const [hideRebroadcasting, setHideRebroadcasting] = useAtom(hideRebroadcastingAtom)
  const [hideStreamingServices, setHideStreamingServices] = useAtom(hideStreamingServicesAtom)
  const [seasonFilters, setSeasonFilters] = useAtom(seasonFiltersAtom)
  const [timeFilters, setTimeFilters] = useAtom(timeFiltersAtom)
  const [dayFilters, setDayFilters] = useAtom(dayFiltersAtom)

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
                  checked={showOnlyCurrentSeason}
                  description="現在のシーズンに放送中の作品だけを表示します。"
                  label="今期に絞る"
                  mb="md"
                  ml="md"
                  onChange={(event) => {
                    setShowOnlyCurrentSeason(event.target.checked)
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
                  {seasonNames.map((name) => (
                    <Chip key={name} value={name}>
                      {getSeasonLabel(name)}
                    </Chip>
                  ))}
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
                  {timeTags.map((tag) => (
                    <Chip key={tag} value={tag}>
                      {getTimeTagLabel(tag)}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>

              <Text>放送曜日</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group
                  multiple
                  value={dayFilters}
                  onChange={(value) => {
                    setDayFilters(value as DayOfWeek[])
                  }}
                >
                  {daysOfWeek.map((day) => (
                    <Chip key={day} value={day}>
                      {getDayOfWeekLabel(day)}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Section>
    </Card>
  )
}
