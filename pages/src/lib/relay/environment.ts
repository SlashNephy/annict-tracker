import { Environment, Network, RecordSource, Store } from 'relay-runtime'

export function getAnnictEnvironment(bearerToken: string): Environment {
  return new Environment({
    network: Network.create(async (request, variables) => {
      const response = await fetch('https://api.annict.com/graphql', {
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

      return await response.json()
    }),
    store: new Store(new RecordSource()),
  })
}
