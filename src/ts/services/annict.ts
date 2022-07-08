import { GraphQLClient } from 'graphql-request'

import { env } from '../env'
import { getSdk } from '../graphql/operations'

import { USER_AGENT } from './common'

const client = new GraphQLClient('https://api.annict.com/graphql', {
  headers: {
    Authorization: `Bearer ${env.ANNICT_ACCESS_TOKEN}`,
    'User-Agent': USER_AGENT,
  },
})

export const annictSdk = getSdk(client)
