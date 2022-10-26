import { useSession } from 'next-auth/react'

import type { Session } from 'next-auth'

export const useAuthenticatedSession = (): Session => {
  const { data } = useSession()
  if (data === null) {
    throw new Error('session is null.')
  }

  return data
}
