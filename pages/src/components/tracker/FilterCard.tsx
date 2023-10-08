import { Accordion, Card, Chip, Group, Text } from '@mantine/core'
import { useAtom } from 'jotai'
import React, { useCallback } from 'react'

import { daysOfWeek, getDayOfWeekLabel } from '../../lib/annict/dayOfWeek.ts'
import { getRelativeTimeGroupLabel, relativeTimeGroups } from '../../lib/annict/relativeTimeGroups.ts'
import { getSeasonLabel, seasonNames } from '../../lib/annict/season.ts'
import { getWatchStatusLabel, watchStatuses } from '../../lib/annict/watchStatus.ts'
import {
  dayFiltersAtom,
  hideRebroadcastingAtom,
  hideStreamingServicesAtom,
  seasonFiltersAtom,
  showOnlyCurrentSeasonAtom,
  timeFiltersAtom,
  watchStatusFiltersAtom,
} from '../../lib/jotai/filters.ts'
import { CheckboxWithHoverCard } from '../common/CheckboxWithHoverCard.tsx'

import type { DayOfWeek } from '../../lib/annict/dayOfWeek.ts'
import type { RelativeTimeGroup } from '../../lib/annict/relativeTimeGroups.ts'
import type { SeasonName } from '../../lib/annict/season.ts'
import type { WatchStatus } from '../../lib/annict/watchStatus.ts'
import type { CardProps } from '@mantine/core'

export function FilterCard(props: Omit<CardProps, 'children'>): React.JSX.Element {
  const [showOnlyCurrentSeason, setShowOnlyCurrentSeason] = useAtom(showOnlyCurrentSeasonAtom)
  const [hideRebroadcasting, setHideRebroadcasting] = useAtom(hideRebroadcastingAtom)
  const [hideStreamingServices, setHideStreamingServices] = useAtom(hideStreamingServicesAtom)
  const [watchStatusFilters, setWatchStatusFilters] = useAtom(watchStatusFiltersAtom)
  const [seasonFilters, setSeasonFilters] = useAtom(seasonFiltersAtom)
  const [timeFilters, setTimeFilters] = useAtom(timeFiltersAtom)
  const [dayFilters, setDayFilters] = useAtom(dayFiltersAtom)

  const handleChangeWatchStatusFilters = useCallback(
    (value: string[]) => {
      // 空にできないようにする
      if (value.length === 0) {
        return
      }

      setWatchStatusFilters(value as WatchStatus[])
    },
    [setWatchStatusFilters]
  )
  const handleChangeTimeFilters = useCallback(
    (value: string[]) => {
      setTimeFilters(value as RelativeTimeGroup[])
    },
    [setTimeFilters]
  )
  const handleChangeSeasonFilters = useCallback(
    (value: string[]) => {
      setSeasonFilters(value as SeasonName[])
    },
    [setSeasonFilters]
  )
  const handleChangeDayFilters = useCallback(
    (value: string[]) => {
      setDayFilters(value as DayOfWeek[])
    },
    [setDayFilters]
  )

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
                  onToggle={setShowOnlyCurrentSeason}
                />
                <CheckboxWithHoverCard
                  checked={hideRebroadcasting}
                  description="再放送の放送予定を非表示にします。"
                  label="再放送を除く"
                  mb="md"
                  ml="md"
                  onToggle={setHideRebroadcasting}
                />
                <CheckboxWithHoverCard
                  checked={hideStreamingServices}
                  description="Annict でサポートされている動画サービスの放送予定を非表示にします。"
                  label="配信サービスを除く"
                  mb="md"
                  ml="md"
                  onToggle={setHideStreamingServices}
                />
              </Group>

              <Text>視聴ステータス</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group multiple value={watchStatusFilters} onChange={handleChangeWatchStatusFilters}>
                  {watchStatuses.map((value) => (
                    <Chip key={value} value={value}>
                      {getWatchStatusLabel(value)}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>

              <Text>放送時間</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group multiple value={timeFilters} onChange={handleChangeTimeFilters}>
                  {relativeTimeGroups.map((value) => (
                    <Chip key={value} value={value}>
                      {getRelativeTimeGroupLabel(value)}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>

              <Text>シーズン</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group multiple value={seasonFilters} onChange={handleChangeSeasonFilters}>
                  {seasonNames.map((value) => (
                    <Chip key={value} value={value}>
                      {getSeasonLabel(value)}
                    </Chip>
                  ))}
                </Chip.Group>
              </Group>

              <Text>放送曜日</Text>
              <Group mb="md" ml="md" mt="md">
                <Chip.Group multiple value={dayFilters} onChange={handleChangeDayFilters}>
                  {daysOfWeek.map((value) => (
                    <Chip key={value} value={value}>
                      {getDayOfWeekLabel(value)}
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
