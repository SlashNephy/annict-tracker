import { Grid } from '@mantine/core'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { useFilterByCurrentSeason } from '../../lib/annict/filters/useFilterByCurrentSeason.ts'
import { useFilterByDayOfWeek } from '../../lib/annict/filters/useFilterByDayOfWeek.ts'
import { useFilterByRebroadcasting } from '../../lib/annict/filters/useFilterByRebroadcasting.ts'
import { useFilterByRelativeTime } from '../../lib/annict/filters/useFilterByRelativeTime.ts'
import { useFilterBySeason } from '../../lib/annict/filters/useFilterBySeason.ts'
import { useFilterByStreamingService } from '../../lib/annict/filters/useFilterByStreamingService.ts'
import { useSortNumber } from '../../lib/annict/useSortNumber.ts'
import { WorkCard } from '../work/WorkCard.tsx'

import type { LibraryGridItem_LibraryEntry$key } from '../../__generated__/LibraryGridItem_LibraryEntry.graphql.ts'

export type LibraryGridItemProps = {
  entryRef: LibraryGridItem_LibraryEntry$key
}

export function LibraryGridItem({ entryRef }: LibraryGridItemProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment LibraryGridItem_LibraryEntry on LibraryEntry {
        # eslint-disable-next-line relay/must-colocate-fragment-spreads
        ...useNextProgram_LibraryEntry
        ...useFilterByCurrentSeason_LibraryEntry
        ...useFilterBySeasons_LibraryEntry
        ...useSortNumber_LibraryEntry
        ...WorkCard_LibraryEntry
      }
    `,
    entryRef
  )

  // 放送時間が古い順に並び替える。ソート順は非同期で確定されるため、CSS order を使う
  const sortNumber = useSortNumber(entry)

  const isEnabled = [
    useFilterByCurrentSeason(entry),
    useFilterByRebroadcasting(entry),
    useFilterByStreamingService(entry),
    useFilterBySeason(entry),
    useFilterByRelativeTime(entry),
    useFilterByDayOfWeek(entry),
  ].every(Boolean)
  if (!isEnabled) {
    return <></>
  }

  return (
    <Grid.Col span={{ lg: 3, md: 4, sm: 6, xs: 12 }} style={{ order: sortNumber }}>
      <WorkCard entryRef={entry} />
    </Grid.Col>
  )
}
