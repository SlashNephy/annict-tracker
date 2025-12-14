import { Badge } from '@mantine/core'
import { useCallback, type ReactNode } from 'react'

import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export type SyobocalSourceBadgeBadge = {
  entryRef: useNextProgram_LibraryEntry$key
}

export function SyobocalSourceBadge({ entryRef }: SyobocalSourceBadgeBadge): ReactNode {
  const nextProgram = useNextProgram(entryRef)

  const handleClick = useCallback(() => {
    if (nextProgram?.source.url) {
      window.open(nextProgram.source.url)
    }
  }, [nextProgram])

  if (nextProgram?.source.name !== 'syobocal') {
    return null
  }

  return (
    <Badge
      key="syobocal"
      title="この放送情報はしょぼいカレンダーとの連携で取得されました。"
      variant="outline"
      onClick={handleClick}
    >
      しょぼいカレンダー
    </Badge>
  )
}
