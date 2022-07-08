import yaml from 'js-yaml'
import fetch from 'node-fetch'

export type SayaDefinitions = {
  channels: {
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
  }[]
  boards: {
    id: string
    name: string
    server: string
    board: string
    keywords?: string[]
  }[]
}

export const fetchSayaDefinitions = async (branch = 'dev'): Promise<SayaDefinitions> => {
  const url = `https://raw.githubusercontent.com/SlashNephy/saya/${branch}/docs/definitions.yml`

  return fetch(url)
    .then((response) => response.text())
    .then((text) => yaml.load(text) as SayaDefinitions)
}
