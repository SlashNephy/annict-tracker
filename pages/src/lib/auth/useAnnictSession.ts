import { useSession } from './useSession.ts'

import type { AnnictSession } from '../../../../functions/api/auth/[[auth]].types.ts'

export function useAnnictSession(): AnnictSession | null {
  return useSession<AnnictSession>()
}
