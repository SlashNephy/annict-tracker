import { Group, Stack, Text } from '@mantine/core'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { RebroadcastBadge } from './badges/RebroadcastBadge.tsx'
import { ScheduleBadge } from './badges/ScheduleBadge.tsx'
import { SyobocalSourceBadge } from './badges/SyobocalSourceBadge.tsx'
import { useNextProgram } from '../../lib/annict/useNextProgram.ts'
import { useWatchProgramSchedule } from '../../lib/annict/useWatchProgramSchedule.ts'
import { RelativeTimeText } from '../common/RelativeTimeText.tsx'

import type { NextProgramInfo_LibraryEntry$key } from '../../__generated__/NextProgramInfo_LibraryEntry.graphql.ts'

export type WorkNextProgramInfoProps = {
  entryRef: NextProgramInfo_LibraryEntry$key
}

export function NextProgramInfo({ entryRef }: WorkNextProgramInfoProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment NextProgramInfo_LibraryEntry on LibraryEntry {
        ...useNextProgram_LibraryEntry
        ...useWatchProgramSchedule_LibraryEntry
      }
    `,
    entryRef
  )
  const nextProgram = useNextProgram(entry)

  useWatchProgramSchedule(entry)

  return (
    <Stack>
      <Group>
        <Text span>{nextProgram?.channel.name}</Text>
        <ScheduleBadge entryRef={entry} />
        <RebroadcastBadge entryRef={entry} />
        <SyobocalSourceBadge entryRef={entry} />
      </Group>

      {nextProgram && (
        <Text>
          <Text span>
            {format(nextProgram.startAt, 'yyyy/MM/dd (EE) HH:mm', { locale: ja })}
            <Text span size="sm">
              (<RelativeTimeText time={nextProgram.startAt} />)
            </Text>
          </Text>
        </Text>
      )}
    </Stack>
  )
}
