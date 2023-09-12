// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

import type { SyobocalProgramsResponse } from '../../functions/api/syobocal/programs.ts'

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

export type SyobocalProgramLookupResult = {
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

export const lookupPrograms = async (tids: number[]): Promise<SyobocalProgramLookupResult> => {
  const response = await fetch(`https://annict-tracker.pages.dev/api/syobocal/programs?id=${tids.join(',')}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = (await response.json()) as SyobocalProgramsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.result
}
