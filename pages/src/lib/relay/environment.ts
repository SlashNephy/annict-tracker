import { minutesToMilliseconds } from 'date-fns'
import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime'

import { FetchError } from '../errors/FetchError.ts'
import { HttpError } from '../errors/HttpError.ts'
import { RateLimitedError } from '../errors/RateLimitedError.ts'

export function createAnnictEnvironment(bearerToken: string): Environment {
  return new Environment({
    network: Network.create((request, variables) => {
      const response = fetch('https://api.annict.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: request.text,
          variables,
        }),
      })
        .then(async (r) => {
          if (r.status === 429) {
            throw new RateLimitedError(r)
          }

          if (!r.ok) {
            throw new HttpError(r)
          }

          return r.json()
        })
        .catch((e) => {
          throw new FetchError(e)
        })

      return Observable.from(response)
    }),
    store: new Store(new RecordSource(), {
      queryCacheExpirationTime: minutesToMilliseconds(5),
    }),
  })
}
