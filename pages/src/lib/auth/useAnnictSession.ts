import { useSession } from './useSession.ts'

import type { UseSessionOptions } from './useSession.ts'
import type { AnnictSession } from 'functions/api/auth/[[auth]].types.ts'

export type UseAnnictSessionOptions = UseSessionOptions<AnnictSession>

export function useAnnictSession(options?: UseAnnictSessionOptions): AnnictSession | null {
  return useSession<AnnictSession>(options)
}
