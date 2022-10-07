import { Badge } from '@mantine/core'
import { add, endOfDay, startOfToday, startOfYesterday } from 'date-fns'
import React from 'react'

// https://github.com/kiraka/annict-web/blob/853819f59a8adb1c0f41df19cbe3bf651d765fee/app/models/tv_time.rb
export const DateBadge: React.FC<{ time: Date }> = ({ time }) => {
  const now = new Date()
  const beginningOfToday = now.getHours() <= 4 ? startOfYesterday() : startOfToday()

  if (
    add(beginningOfToday, { days: -1, hours: 5 }) < time &&
    time < add(endOfDay(beginningOfToday), { days: -1, hours: 5 })
  ) {
    return <Badge color="green">昨日</Badge>
  }

  if (add(beginningOfToday, { hours: 5 }) < time && time < add(endOfDay(beginningOfToday), { hours: 5 })) {
    return <Badge color="red">今日</Badge>
  }

  if (
    add(beginningOfToday, { days: 1, hours: 5 }) < time &&
    time < add(endOfDay(beginningOfToday), { days: 1, hours: 5 })
  ) {
    return <Badge color="blue">明日</Badge>
  }

  if (time < add(beginningOfToday, { days: -1, hours: 5 })) {
    return <Badge color="green">終了</Badge>
  }

  return null
}
