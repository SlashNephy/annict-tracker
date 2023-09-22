import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime'

export function createAnnictEnvironment(bearerToken: string): Environment {
  return new Environment({
    network: Network.create((request, variables) => {
      const response = fetch('https://api.annict.com/graphql', {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: request.text,
          variables,
        }),
      })

      return Observable.from(response.then(async (data) => data.json()))
    }),
    store: new Store(new RecordSource()),
  })
}
