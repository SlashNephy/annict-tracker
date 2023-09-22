import { useQuery } from '@tanstack/react-query'

import type { UseQueryOptions } from '@tanstack/react-query'
import type { VersionResponse } from 'functions/api/version.types.ts'

export type UseServerVersionOptions = Omit<UseQueryOptions<VersionResponse>, 'queryFn' | 'initialData'>

export function useServerVersion(options?: UseServerVersionOptions): VersionResponse | null {
  const { data } = useQuery<VersionResponse>(
    ['version'],
    async () => {
      const response = await fetch('/api/version')
      return await response.json()
    },
    options
  )

  return data ?? null
}
