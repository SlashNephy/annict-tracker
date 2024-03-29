import { Text } from '@mantine/core'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  secondsToMilliseconds,
} from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'

export type RelativeTimeTextProps = {
  time: Date
}

export function RelativeTimeText({ time }: RelativeTimeTextProps): React.JSX.Element {
  const createText = useCallback(() => {
    const now = new Date()
    const years = differenceInYears(time, now)
    if (Math.abs(years) > 0) {
      return years > 0 ? `${years}年後` : `${-years}年前`
    }

    const months = differenceInMonths(time, now)
    if (Math.abs(months) > 0) {
      return months > 0 ? `${months}ヶ月後` : `${-months}ヶ月前`
    }

    const days = differenceInDays(time, now)
    if (Math.abs(days) > 0) {
      return days > 0 ? `${days}日後` : `${-days}日前`
    }

    const hours = differenceInHours(time, now)
    if (Math.abs(hours) > 0) {
      return hours > 0 ? `${hours}時間後` : `${-hours}時間前`
    }

    const minutes = differenceInMinutes(time, now)
    if (Math.abs(minutes) > 0) {
      return minutes > 0 ? `${minutes}分後` : `${-minutes}分前`
    }

    const seconds = differenceInSeconds(time, now)

    return seconds > 0 ? `${seconds}秒後` : `${-seconds}秒前`
  }, [time])

  const [label, setLabel] = useState(createText)
  const update = useCallback(() => {
    setLabel(createText)
  }, [createText])

  useEffect(() => {
    const interval = window.setInterval(update, secondsToMilliseconds(1))

    return () => {
      window.clearInterval(interval)
    }
  }, [update])

  return <Text span>{label}</Text>
}
