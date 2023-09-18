import type {
  useLibraryEntries_getViewerQuery$data,
  SeasonName,
} from '../../__generated__/useLibraryEntries_getViewerQuery.graphql.ts'

export type AnnictLibraryEntry = NonNullable<
  NonNullable<NonNullable<NonNullable<useLibraryEntries_getViewerQuery$data['viewer']>['libraryEntries']>['nodes']>[0]
>
export type AnnictWork = NonNullable<AnnictLibraryEntry['work']>
export type AnnictProgram = NonNullable<AnnictLibraryEntry['nextProgram']>
export type AnnictEpisode = NonNullable<AnnictLibraryEntry['nextEpisode']>

export class AnnictSeason {
  public constructor(
    public readonly year: number | null,
    public readonly name: SeasonName | null
  ) {}

  static get #current(): AnnictSeason {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    if (month >= 1 && month <= 3) {
      return new AnnictSeason(year, 'WINTER')
    }
    if (month >= 4 && month <= 6) {
      return new AnnictSeason(year, 'SPRING')
    }
    if (month >= 7 && month <= 9) {
      return new AnnictSeason(year, 'SUMMER')
    }
    if (month >= 10 && month <= 12) {
      return new AnnictSeason(year, 'AUTUMN')
    }
    throw new Error(`Unexpected month: ${month}`)
  }

  public get isCurrentSeason(): boolean {
    return this.year === AnnictSeason.#current.year && this.name === AnnictSeason.#current.name
  }

  public equals(other?: AnnictSeason): boolean {
    return this.year === other?.year && this.name === other.name
  }
}

// https://annict.com/db/channels
export const annictChannelIds = {
  bandai_channel: 107,
  niconico_channel: 165,
  d_anime: 241,
  prime_video: 243,
  netflix: 244,
  abema: 260,
  d_anime_niconico: 306,
}

export const isStreamingService = (channelId?: number): boolean => {
  if (channelId === undefined) {
    return false
  }

  return Object.values(annictChannelIds).includes(channelId)
}

export type AnnictVodData = {
  work_id: number
  program_id: number
  channel_id: number
  channel_name: string
  started_at?: string
  is_rebroadcast: boolean
  vod_code?: string
  vod_title?: string
}

export async function fetchAnnictVodData(ref = 'master'): Promise<AnnictVodData[]> {
  const response = await fetch(
    `https://raw.githubusercontent.com/SlashNephy/.github/${ref}/env/userscript/bin/collect-vod-data/dist/data.json`
  )
  return response.json()
}
