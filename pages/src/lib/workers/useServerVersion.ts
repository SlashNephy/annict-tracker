import { minutesToMilliseconds } from 'date-fns'
import { preload } from 'swr'
import useSWRImmutable from 'swr/immutable'

import type { VersionResponse } from 'functions/api/version.types.ts'

const key = 'version'

void preload(key, fetchServerVersion)

export function useServerVersion(): VersionResponse | undefined {
  const { data } = useSWRImmutable(
    key,
    fetchServerVersion,

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
