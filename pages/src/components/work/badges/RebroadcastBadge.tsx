import { Badge } from '@mantine/core'

import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'
import type { ReactNode } from 'react'

export type RebroadcastBadge = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function RebroadcastBadge({ entryRef }: RebroadcastBadge): ReactNode {
  const nextProgram = useNextProgram(entryRef)
  if (!nextProgram?.isRebroadcast) {
    return null
  }

  return (
    <Badge key="rebroadcast" color="yellow.6" variant="outline">
      再放送
    </Badge>
  )
}
