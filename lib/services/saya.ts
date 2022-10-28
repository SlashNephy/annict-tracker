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
  public constructor(public readonly definition: SayaDefinition) {}

  public findChannelByAnnictId(id: number): SayaChannel | null {
    return this.definition.channels.find((x) => x.annictId === id) ?? null
  }

  public findChannelBySyobocalId(id: number): SayaChannel | null {
    return this.definition.channels.find((x) => x.syobocalId === id) ?? null
  }
}

export const fetchSayaRemoteDatabase = async (branch = 'master'): Promise<SayaDatabase> => {
  return new SayaDatabase(await fetchSayaDefinition(branch))
}

const fetchSayaDefinition = async (branch: string): Promise<SayaDefinition> => {
  const url = `https://raw.githubusercontent.com/SlashNephy/saya-definitions/${branch}/definitions.yml`

  const response = await fetch(url)
  const text = await response.text()
  return yaml.load(text) as SayaDefinition
}

export const filterSayaChannel = (channel: SayaChannel): boolean => {
  if (channel.syobocalId === undefined) {
    return false
  }

  // アニメ放送しない局を除く
  switch (channel.type) {
    case 'GR':
      switch (channel.syobocalId) {
        case 158: // 放送大学
          return false
        default:
          return true
      }
    case 'BS':
      switch (channel.syobocalId) {
        case 71: // BS日テレ
        case 18: // BS朝日
        case 16: // BS-TBS
        case 15: // BSテレ東
        case 17: // BSフジ
        case 128: // BS11
        case 129: // BS12
        case 197: // BSアニマックス
        case 76: // WOWOWシネマ
        case 204: // WOWOWプライム
        case 97: // WOWOWライブ
        case 271: // BS松竹東急
        case 272: // BSよしもと
        case 273: // BSJapanext
          return true
        default:
          return false
      }
    case 'CS':
      switch (channel.syobocalId) {
        case 20: // AT-X
        case 21: // アニマックス
        case 22: // キッズステーション
        case 23: // カートゥーンネットワーク
          return true
        default:
          return false
      }
    default:
      return true
  }
}
