export type ArmEntry = {
  mal_id?: number
  annict_id?: number
  anilist_id?: number
  syobocal_tid?: number
}

export class ArmDatastore {
  public constructor(public readonly entries: ArmEntry[]) {}

  public findByAnnictId(id: number): ArmEntry | null {
    return this.entries.find((x) => x.annict_id === id) ?? null
  }

  public findBySyobocalTid(tid: number): ArmEntry | null {
    return this.entries.find((x) => x.syobocal_tid === tid) ?? null
  }
}
