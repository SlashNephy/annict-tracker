import { useAuthenticatedSession, useSession } from '../useSession.ts'

import type { AnnictSession } from '../../../../../functions/api/auth/[[auth]].ts'
import type { UseSessionOptions } from '../useSession.ts'

export type UseAnnictSessionOptions = UseSessionOptions<AnnictSession>

export function useAnnictSession(options?: UseAnnictSessionOptions): AnnictSession | null {
  return useSession<AnnictSession>(options)
}

export function useAuthenticatedAnnictSession(options?: UseAnnictSessionOptions): AnnictSession {
  return useAuthenticatedSession<AnnictSession>(options)
}
