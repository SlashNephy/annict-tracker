import { minutesToMilliseconds } from 'date-fns'
import useSWR, { preload } from 'swr'

import type { VersionResponse } from 'functions/api/version.types.ts'

const key = 'version'

void preload(key, fetchServerVersion)

export function useServerVersion(): VersionResponse | null {
  const { data } = useSWR(
    key,
    fetchServerVersion,

    {
      refreshInterval: minutesToMilliseconds(5),
    }
  )

  return data ?? null
}

async function fetchServerVersion(): Promise<VersionResponse> {
  const response = await fetch('/api/version')
  return await response.json()
}
