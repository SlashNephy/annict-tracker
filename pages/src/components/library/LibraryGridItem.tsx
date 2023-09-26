import { Grid } from '@mantine/core'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { useFilterByCurrentSeason } from '../../lib/annict/filters/useFilterByCurrentSeason.ts'
import { useFilterByDay } from '../../lib/annict/filters/useFilterByDay.ts'
import { useFilterByRebroadcasting } from '../../lib/annict/filters/useFilterByRebroadcasting.ts'
import { useFilterBySeasons } from '../../lib/annict/filters/useFilterBySeasons.ts'
import { useFilterByStreamingServices } from '../../lib/annict/filters/useFilterByStreamingServices.ts'
import { useFilterByTime } from '../../lib/annict/filters/useFilterByTime.ts'
import { useSortNumber } from '../../lib/annict/filters/useSortNumber.ts'
import { WorkCard } from '../work/WorkCard.tsx'

import type { LibraryGridItem_LibraryEntry$key } from '../../__generated__/LibraryGridItem_LibraryEntry.graphql.ts'

export type LibraryGridItemProps = {
  entryRef: LibraryGridItem_LibraryEntry$key
}

export function LibraryGridItem({ entryRef }: LibraryGridItemProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment LibraryGridItem_LibraryEntry on LibraryEntry {
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
    useFilterByStreamingServices(entry),
    useFilterBySeasons(entry),
    useFilterByTime(entry),
    useFilterByDay(entry),
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
