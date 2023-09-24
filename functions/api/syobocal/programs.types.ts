export type SyobocalProgramsResponse =
  | {
      success: true
      result: SyobocalProgram[]
    }
  | {
      success: false
      error: string
    }

export type SyobocalProgramFlag = 'warning' | 'exclamation' | 'first' | 'last' | 'rebroadcast'

export type SyobocalProgram = {
  tid: number
  chid: number
  pid: number

  startAt: number
  count?: number
  flags: SyobocalProgramFlag[]
  note?: string
}
