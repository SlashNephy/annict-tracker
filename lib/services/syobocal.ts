// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

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

export const lookupPrograms = async (tids: number[]): Promise<SyobocalProgramLookupResult> => {
  const response = await fetch('/api/syobocal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Command: 'ProgLookup',
      TID: tids.join(','),
    } as SyobocalRequest),
  })
  return response.json()
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
  return response.json()
}
