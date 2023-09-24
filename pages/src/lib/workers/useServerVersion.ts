import { minutesToMilliseconds } from 'date-fns'
import useSWRImmutable from 'swr/immutable'

import type { VersionResponse } from 'functions/api/version.types.ts'

export function useServerVersion(): VersionResponse | undefined {
  const { data } = useSWRImmutable(
    'version',
    async () => await fetchServerVersion(),

    {
      refreshInterval: minutesToMilliseconds(5),
    }
  )

  return data
}

async function fetchServerVersion(): Promise<VersionResponse> {
  const response = await fetch('/api/version')
  return await response.json()
}
