import { Badge } from '@mantine/core'
import React from 'react'

import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type RebroadcastBadge = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function RebroadcastBadge({ entryRef }: RebroadcastBadge): React.JSX.Element {
  const nextProgram = useNextProgram(entryRef)

  return (
    <>
      {nextProgram?.isRebroadcast && (
        <Badge key="rebroadcast" color="yellow" variant="outline">
          再放送
        </Badge>
      )}
    </>
  )
}
