import { AppLayout } from '../components/layout/AppLayout.tsx'
import { GuestUser } from '../components/tracker/GuestUser.tsx'
import { LoginUser } from '../components/tracker/LoginUser.tsx'
import { useAnnictSession } from '../lib/auth/useAnnictSession.ts'
import { AnnictRelayEnvironment } from '../lib/relay/AnnictRelayEnvironment.tsx'

import type { ReactNode } from 'react'

export function Index(): ReactNode {
  const session = useAnnictSession()

  return (
    <AppLayout>
      {session?.accessToken
        ? (
            <AnnictRelayEnvironment bearerToken={session.accessToken}>
              <LoginUser />
            </AnnictRelayEnvironment>
          )
        : (
            <GuestUser />
          )}
    </AppLayout>
  )
}
