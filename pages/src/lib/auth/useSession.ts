import { minutesToMilliseconds } from 'date-fns'
import useSWR from 'swr'

import type { Session } from '@auth/core/types'

export function useSession<S extends Session>(): S | null {
  const { data } = useSWR<S>('session', fetchSession, {
    refreshInterval: minutesToMilliseconds(15),
  })

  return data ?? null
}

async function fetchSession<S extends Session>(): Promise<S> {
  const response = await fetch('/api/auth/session')
  return await response.json()
}
