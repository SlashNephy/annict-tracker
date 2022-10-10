import { getMonth } from 'date-fns'
import { GraphQLClient } from 'graphql-request'

import { getSdk } from '../../graphql/generated/sdk'
import { SeasonName } from '../../graphql/generated/types'

import type { GetViewerProgramsQuery } from '../../graphql/generated/operations'
import type { Sdk } from '../../graphql/generated/sdk'

export const createAnnictClient = (accessToken: string): Sdk => {
  const client = new GraphQLClient('https://api.annict.com/graphql', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  })

  return getSdk(client)
}

export type ViewerProgram = NonNullable<
  NonNullable<NonNullable<NonNullable<GetViewerProgramsQuery['viewer']>['programs']>['nodes']>[0]
>

export type WorkEpisode = NonNullable<NonNullable<NonNullable<ViewerProgram['work']['episodes']>['nodes']>[0]>

export const getCurrentSeason = (): SeasonName => {
  const month = getMonth(new Date()) + 1
  if (1 <= month && month <= 3) {
    return SeasonName.Winter
  }
  if (4 <= month && month <= 6) {
    return SeasonName.Spring
  }
  if (7 <= month && month <= 9) {
    return SeasonName.Summer
  }

  return SeasonName.Autumn
}
