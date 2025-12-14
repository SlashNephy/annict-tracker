import { XMLParser } from 'fast-xml-parser'

import type { SyobocalProgram, SyobocalProgramFlag } from '../api/syobocal/programs.types.ts'

type RawSyobocalProgramsResponse = {
  ProgLookupResponse: {
    '?xml': ''
    ProgItems?: {
      ProgItem: {
        LastUpdate: string
        PID: number
        TID: number
        StTime: string
        StOffset: number // 遅延した秒
        EdTime: string
        Count: number | ''
        SubTitle: string
        ProgComment: string
        Flag: RawSyobocalProgramFlag
        Deleted: 0 | 1
        Warn: 0 | 1
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ChID: number
        Revision: number
      }[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
}

enum RawSyobocalProgramFlag {
  Exclamation = 1 << 0,
  First = 1 << 1,
  Last = 1 << 2,
  Rebroadcast = 1 << 3,
}

export async function lookupPrograms(id: string): Promise<RawSyobocalProgramsResponse> {
  const params = new URLSearchParams({
    Command: 'ProgLookup',
    TID: id,
  }).toString()

  const response = await fetch(`https://cal.syoboi.jp/db.php?${params}`, {
    headers: {
      'User-Agent': 'annict-tracker-worker/1.0 (+https://github.com/SlashNephy/annict-tracker)',
    },
  })
  const text = await response.text()

  const parser = new XMLParser()

  return parser.parse(text)
}

export function parseSyobocalProgramsResponse(response: RawSyobocalProgramsResponse): SyobocalProgram[] {
  return (
    response.ProgLookupResponse.ProgItems?.ProgItem.map(
      (item) =>
        ({
          tid: item.TID,
          chid: item.ChID,
          pid: item.PID,
          startAt: Date.parse(item.StTime),
          endAt: Date.parse(item.EdTime),
          count: item.Count || undefined,
          flags: parseSyobocalProgramFlags(item.Flag, item.Warn),
          note: item.ProgComment || undefined,
        }) satisfies SyobocalProgram,
    ) ?? []
  )
}

function parseSyobocalProgramFlags(flags: RawSyobocalProgramFlag, warn: 0 | 1): SyobocalProgramFlag[] {
  const result: SyobocalProgramFlag[] = []
  if (warn === 1) {
    result.push('warning')
  }

  if ((flags & RawSyobocalProgramFlag.Exclamation) === RawSyobocalProgramFlag.Exclamation) {
    result.push('exclamation')
  }
  if ((flags & RawSyobocalProgramFlag.First) === RawSyobocalProgramFlag.First) {
    result.push('first')
  }
  if ((flags & RawSyobocalProgramFlag.Last) === RawSyobocalProgramFlag.Last) {
    result.push('last')
  }
  if ((flags & RawSyobocalProgramFlag.Rebroadcast) === RawSyobocalProgramFlag.Rebroadcast) {
    result.push('rebroadcast')
  }

  return result
}
