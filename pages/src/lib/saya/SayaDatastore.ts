export type SayaChannel = {
  name: string
  type: 'GR' | 'BS' | 'CS' | 'SKY'
  serviceIds: number[]
  networkId: number
  flag?: number
  nicojkId?: number
  hasOfficialNicolive?: boolean
  nicoliveTags?: string[]
  nicoliveCommunityIds?: string[]
  miyoutvId?: string
  twitterKeywords?: string[]
  boardIds?: string[]
  syobocalId?: number
  annictId?: number
}

export type SayaBoard = {
  id: string
  name: string
  server: string
  board: string
  keywords?: string[]
}

export type SayaDefinition = {
  channels: SayaChannel[]
  boards: SayaBoard[]
}

export class SayaDatastore {
  public constructor(public readonly definition: SayaDefinition) {}

  public findChannelByAnnictId(id: number): SayaChannel | null {
    return this.definition.channels.find((x) => x.annictId === id) ?? null
  }

  public findChannelBySyobocalId(id: number): SayaChannel | null {
    return this.definition.channels.find((x) => x.syobocalId === id) ?? null
  }
}
