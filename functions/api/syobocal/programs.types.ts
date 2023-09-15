// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

export type SyobocalProgramsResponse =
  | {
      success: true
      result: SyobocalProgramsResult
    }
  | {
      success: false
      error: string
    }

export type SyobocalProgramsResult = {
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
