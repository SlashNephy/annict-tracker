import { format } from 'date-fns'
import { XMLParser } from 'fast-xml-parser'
import fetch from 'node-fetch'

import { USER_AGENT } from './common'

type SyobocalProgramLookupResult = {
  ProgLookupResponse?: {
    ProgItems?: {
      ProgItem: {
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
      }[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

type SyobocalTitleLookupResult = {
  TitleLookupResponse?: {
    TitleItems: {
      TitleItem: {
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
      }[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

// https://cal.syoboi.jp/mng?Action=ShowChList
const channelIds = [
  1, // NHK 総合
  2, // NHK Eテレ
  3, // フジテレビ
  4, // 日本テレビ
  5, // TBS
  6, // テレビ朝日
  7, // テレビ東京
  19, // TOKYO MX
  20, // AT-X
  128, // BS11
  129, // BS12
]

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

export const lookupPrograms = async (): Promise<SyobocalProgramLookupResult> => {
  const url = `https://cal.syoboi.jp/db.php?Command=ProgLookup&JOIN=SubTitles&Range=${makeDatetimeRange()}&ChID=${channelIds.join(
    ','
  )}`
  console.log(url)

  return fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  })
    .then((response) => response.text())
    .then((text) => new XMLParser().parse(text) as SyobocalProgramLookupResult)
}

export const lookupTitles = async (tids: number[]): Promise<SyobocalTitleLookupResult> => {
  const url = `https://cal.syoboi.jp/db.php?Command=TitleLookup&TID=${tids.join(',')}`

  return fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  })
    .then((response) => response.text())
    .then((text) => new XMLParser().parse(text) as SyobocalTitleLookupResult)
}
