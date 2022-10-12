import { arm } from '@kawaiioverflow/arm'

export type ArmEntry = typeof arm[0]

export class ArmDatabase {
  public static DEFAULT = new ArmDatabase()
  public readonly entries: ArmEntry[]

  public constructor() {
    this.entries = arm
  }

  public findByAnnictId(id: number): ArmEntry | null {
    return this.entries.find((x) => x.annict_id === id) ?? null
  }

  public findBySyobocalTid(tid: number): ArmEntry | null {
    return this.entries.find((x) => x.syobocal_tid === tid) ?? null
  }
}
