export type ArmEntry = {
  mal_id?: number
  annict_id?: number
  anilist_id?: number
  syobocal_tid?: number
}

export class ArmDatabase {
  #entries: ArmEntry[] = []

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public constructor(private readonly factory: () => ArmEntry[] | Promise<ArmEntry[]>) {}

  public get entries(): ArmEntry[] {
    return this.#entries
  }

  public async update(): Promise<void> {
    const result = this.factory()

    if ('then' in result) {
      this.#entries = await result
    } else {
      this.#entries = result
    }
  }

  public findByAnnictId(id: number): ArmEntry | null {
    return this.entries.find((x) => x.annict_id === id) ?? null
  }

  public findBySyobocalTid(tid: number): ArmEntry | null {
    return this.entries.find((x) => x.syobocal_tid === tid) ?? null
  }
}

export const ArmSupplementaryDatabase = new ArmDatabase(async () => {
  const response = await fetch('https://raw.githubusercontent.com/SlashNephy/arm-supplementary/master/dist/arm.json')
  return await response.json()
})
