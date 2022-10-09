import { Badge } from '@mantine/core'
import React from 'react'

import type { ProgramModel } from '../models/ProgramModel'

export const DateBadge: React.FC<{ program: ProgramModel }> = ({ program }) => {
  switch (program.filters.time) {
    case 'yesterday':
      return <Badge color="green">昨日</Badge>
    case 'today':
      return <Badge color="red">今日</Badge>
    case 'tomorrow':
      return <Badge color="blue">明日</Badge>
    case 'finished':
      return <Badge color="green">終了</Badge>
    default:
      return null
  }
}
