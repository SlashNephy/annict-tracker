import { useQuery } from '@tanstack/react-query'

import type { Session } from '@auth/core/types'
import type { UseQueryOptions } from '@tanstack/react-query'

export type UseSessionOptions<S extends Session | null> = Omit<UseQueryOptions<S>, 'queryFn' | 'initialData'>

export function useSession<S extends Session | null>(options?: UseSessionOptions<S>): S | null {
  const { data } = useQuery<S>(
    ['session', ...(options?.queryKey ? options.queryKey : [])],
    async () => {
      const response = await fetch('/api/auth/session')
      return await response.json()
    },
    options
  )

  return data ?? null
}
