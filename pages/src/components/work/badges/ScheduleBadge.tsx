import { Badge } from '@mantine/core'
import { add, isAfter } from 'date-fns'

import { useRelativeTimeGroup } from '../../../lib/annict/relativeTimeGroups.ts'
import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'
import type { ReactNode } from 'react'

export type WorkScheduleBadgeProps = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function ScheduleBadge({ entryRef }: WorkScheduleBadgeProps): ReactNode {
  const nextProgram = useNextProgram(entryRef)
  const group = useRelativeTimeGroup(entryRef)

  switch (group) {
    case 'yesterday':
      return (
        <Badge key="yesterday" c="black" color="teal.3">
          昨日
        </Badge>
      )
    case 'today':
      return (
        <>
          <Badge key="today" color="red.6">
            今日
          </Badge>
          {/* 今日放送であっても終了していたら出す。番組の長さを30分に仮定している */}
          {nextProgram
            && isAfter(new Date(), nextProgram.endAt ?? add(nextProgram.startAt, { minutes: 30 })) && (
            <Badge key="finished" c="black" color="teal.3">
              終了
            </Badge>
          )}
        </>
      )
    case 'tomorrow':
      return (
        <Badge key="tomorrow" color="blue.7">
          明日
        </Badge>
      )
    case 'finished':
      return (
        <Badge key="finished" c="black" color="teal.3">
          終了
        </Badge>
      )
    case 'future':
    case 'undetermined':
    default:
      return null
  }
}
