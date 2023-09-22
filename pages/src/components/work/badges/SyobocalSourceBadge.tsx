import { Badge } from '@mantine/core'
import React from 'react'

import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type SyobocalSourceBadgeBadge = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function SyobocalSourceBadge({ entryRef }: SyobocalSourceBadgeBadge): React.JSX.Element {
  const nextProgram = useNextProgram(entryRef)

  return (
    <>
      {nextProgram?.source === 'syobocal' && (
        <Badge
          key="syobocal"
          color="blue"
          title="この放送情報はしょぼいカレンダーとの連携で取得されました。"
          variant="outline"
        >
          しょぼカル
        </Badge>
      )}
    </>
  )
}
