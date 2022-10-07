import yaml from 'js-yaml'

export type SayaDefinition = {
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

export const fetchSayaDefinitions = async (branch = 'master'): Promise<SayaDefinition> => {
  const url = `https://raw.githubusercontent.com/SlashNephy/saya-definitions/${branch}/definitions.yml`

  return fetch(url)
    .then(async (response) => response.text())
    .then((text) => yaml.load(text) as SayaDefinition)
}
