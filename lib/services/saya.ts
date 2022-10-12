import yaml from 'js-yaml'

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

export class SayaDatabase {
  readonly #branch: string
  readonly #promise: Promise<SayaDefinition>

  public constructor(branch = 'master') {
    this.#branch = branch
    this.#promise = this.#fetch()
  }

  async #fetch() {
    const url = `https://raw.githubusercontent.com/SlashNephy/saya-definitions/${this.#branch}/definitions.yml`

    const response = await fetch(url)
    const text = await response.text()
    return yaml.load(text) as SayaDefinition
  }

  public async get(): Promise<SayaDefinition> {
    return await this.#promise
  }
}
