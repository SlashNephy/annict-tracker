import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../../graphql/annict/sdk'
import { SeasonName } from '../../graphql/annict/types'

import type { GetViewerLibraryEntriesQuery } from '../../graphql/annict/operations'
import type { Sdk } from '../../graphql/annict/sdk'

export const createAnnictClient = (accessToken: string): Sdk => {
  const client = new GraphQLClient('https://api.annict.com/graphql', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return getSdk(client)
}

export type AnnictLibraryEntry = NonNullable<
  NonNullable<NonNullable<NonNullable<GetViewerLibraryEntriesQuery['viewer']>['libraryEntries']>['nodes']>[0]
>
export type AnnictWork = NonNullable<AnnictLibraryEntry['work']>
export type AnnictProgram = NonNullable<AnnictLibraryEntry['nextProgram']>
export type AnnictEpisode = NonNullable<AnnictLibraryEntry['nextEpisode']>

export class AnnictSeason {
  public constructor(public readonly year: number | null, public readonly name: SeasonName | null) {}

  static get #current(): AnnictSeason {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    if (1 <= month && month <= 3) {
      return new AnnictSeason(year, SeasonName.Winter)
    } else if (4 <= month && month <= 6) {
      return new AnnictSeason(year, SeasonName.Spring)
    } else if (7 <= month && month <= 9) {
      return new AnnictSeason(year, SeasonName.Summer)
    } else if (10 <= month && month <= 12) {
      return new AnnictSeason(year, SeasonName.Autumn)
    } else {
      throw new Error(`Unexpected month: ${month}`)
    }
  }

  public get isCurrentSeason(): boolean {
    return this.year === AnnictSeason.#current.year && this.name === AnnictSeason.#current.name
  }

  public equals(other?: AnnictSeason): boolean {
    return this.year === other?.year && this.name === other.name
  }
}

export type AnnictProfile = typeof exampleAnnictProfile
const exampleAnnictProfile = {
  id: 2,
  username: 'shimbaco',
  name: 'Koji Shimba',
  description: 'アニメ好きが高じてこのサービスを作りました。聖地巡礼を年に数回しています。',
  url: 'https://shimba.co',
  avatar_url:
    'https://api-assets.annict.com/paperclip/profiles/1/tombo_avatars/master/d8af7adc8122c96ba7639218fd8b5ede332d42f2.jpg?1431357292',
  background_image_url:
    'https://api-assets.annict.com/paperclip/profiles/1/tombo_background_images/master/ee15d577fb2f2d61bdaf700cfab894b286a5762d.jpg?1486753229',
  records_count: 2369,
  followings_count: 258,
  followers_count: 205,
  wanna_watch_count: 237,
  watching_count: 103,
  watched_count: 335,
  on_hold_count: 45,
  stop_watching_count: 244,
  created_at: '2014-03-02T15:38:40.000Z',
  email: 'me@shimba.co',
  notifications_count: 0,
}
