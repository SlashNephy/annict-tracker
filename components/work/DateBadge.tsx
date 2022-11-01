import { Badge } from '@mantine/core'
import React from 'react'

import { useLibraryEntry } from '../../lib/useLibraryEntry'

import type { BadgeProps } from '@mantine/core'

export const DateBadge: React.FC<Omit<BadgeProps, 'color'>> = (props) => {
  const { entry } = useLibraryEntry()

  switch (entry.timeTag) {
    case 'yesterday':
      return (
        <Badge {...props} color="green">
          昨日
        </Badge>
      )
    case 'today':
      return (
        <Badge {...props} color="red">
          今日
        </Badge>
      )
    case 'tomorrow':
      return (
        <Badge {...props} color="blue">
          明日
        </Badge>
      )
    case 'finished':
      return (
        <Badge {...props} color="green">
          終了
        </Badge>
      )
    default:
      return null
  }
}
