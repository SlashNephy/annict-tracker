// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import { format } from 'date-fns'

import type { SyobocalRequest } from '../../pages/api/syobocal'

export type SyobocalProgram = {
  LastUpdate: string
  PID: number
  TID: number
  StTime: string
  StOffset: number
  EdTime: string
  Count: number
  SubTitle: string
  ProgComment: string
  Flag: number
  Deleted: number
  Warn: number
  ChID: number
  Revision: number
  STSubTitle?: string
}

type SyobocalProgramLookupResult = {
  ProgLookupResponse?: {
    ProgItems?: {
      ProgItem?: SyobocalProgram[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

export type SyobocalTitle = {
  TID: number
  LastUpdate: string
  Title: string
  ShortTitle: string
  TitleYomi: string
  TitleEN: string
  Comment: string
  Cat: number
  TitleFlag: number
  FirstYear: number
  FirstMonth: number
  FirstEndYear: number
  FirstEndMonth: number
  FirstCh: string
  Keywords: string
  UserPoint: number
  UserPointRank: number
  SubTitles: string
}

type SyobocalTitleLookupResult = {
  TitleLookupResponse?: {
    TitleItems?: {
      TitleItem?: SyobocalTitle[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

const makeDatetimeRange = (): string => {
  const startHour = 20
  const endHour = 3

  const start = new Date()
  const end = new Date()

  if (start.getHours() < endHour) {
    start.setHours(start.getHours(), start.getMinutes(), 0, 0)
    end.setHours(endHour, 0, 0, 0)
  } else {
    start.setHours(Math.max(startHour, start.getHours()), start.getHours() > startHour ? start.getMinutes() : 0, 0, 0)
    end.setDate(end.getDate() + 1)
    end.setHours(endHour, 0, 0, 0)
  }

  return `${format(start, 'yyyyMMdd_HHmmss')}-${format(end, 'yyyyMMdd_HHmmss')}`
}

export const lookupPrograms = async (channelIds: string[]): Promise<SyobocalProgramLookupResult> => {
  const response = await fetch('/api/syobocal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Command: 'ProgLookup',
      JOIN: 'SubTitles',
      Range: makeDatetimeRange(),
      ChID: channelIds.join(','),
    } as SyobocalRequest),
  })
  return await response.json()
}

export const lookupTitles = async (tids: number[]): Promise<SyobocalTitleLookupResult> => {
  const response = await fetch('/api/syobocal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Command: 'TitleLookup',
      TID: tids.join(','),
    } as SyobocalRequest),
  })
  return await response.json()
}
