import { Badge } from '@mantine/core'
import React from 'react'

import { useTimeTag } from '../../../lib/annict/filters/useTimeTag.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type WorkScheduleBadgeProps = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function ScheduleBadge({ entryRef }: WorkScheduleBadgeProps): React.JSX.Element {
  const tag = useTimeTag(entryRef)
  switch (tag) {
    case 'yesterday':
      return (
        <Badge key="yesterday" color="green">
          昨日
        </Badge>
      )
    case 'today':
      return (
        <Badge key="today" color="red">
          今日
        </Badge>
      )
    case 'tomorrow':
      return (
        <Badge key="tomorrow" color="blue">
          明日
        </Badge>
      )
    case 'finished':
      return (
        <Badge key="finished" color="green">
          終了
        </Badge>
      )
    default:
      return <></>
  }
}
