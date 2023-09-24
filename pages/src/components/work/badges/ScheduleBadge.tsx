import { Badge } from '@mantine/core'
import { add, isAfter } from 'date-fns'
import React from 'react'

import { useTimeTag } from '../../../lib/annict/filters/useTimeTag.ts'
import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type WorkScheduleBadgeProps = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function ScheduleBadge({ entryRef }: WorkScheduleBadgeProps): React.JSX.Element {
  const nextProgram = useNextProgram(entryRef)
  const tag = useTimeTag(entryRef)

  switch (tag) {
    case 'yesterday':
      return (
        <Badge key="yesterday" color="green.4">
          昨日
        </Badge>
      )
    case 'today':
      return (
        <>
          <Badge key="today" color="red.5">
            今日
          </Badge>
          {/* 今日放送であっても終了していたら出す。番組の長さを30分に仮定している */}
          {nextProgram &&
            isAfter(new Date(), nextProgram.endAt ? nextProgram.endAt : add(nextProgram.startAt, { minutes: 30 })) && (
              <Badge key="finished" color="green.5">
                終了
              </Badge>
            )}
        </>
      )
    case 'tomorrow':
      return (
        <Badge key="tomorrow" color="blue">
          明日
        </Badge>
      )
    case 'finished':
      return (
        <Badge key="finished" color="green.5">
          終了
        </Badge>
      )
    default:
      return <></>
  }
}
