import React from 'react'

import { AppLayout } from '../components/layout/AppLayout.tsx'
import { GuestUser } from '../components/tracker/GuestUser.tsx'
import { LoginUser } from '../components/tracker/LoginUser.tsx'
import { useAnnictSession } from '../lib/auth/useAnnictSession.ts'
import { AnnictRelayEnvironment } from '../lib/relay/AnnictRelayEnvironment.tsx'

export function Index(): React.JSX.Element {
  const session = useAnnictSession()

  return (
    <AppLayout>
      {session?.accessToken ? (
        <AnnictRelayEnvironment bearerToken={session.accessToken}>
          <LoginUser />
        </AnnictRelayEnvironment>
      ) : (
        <GuestUser />
      )}
    </AppLayout>
  )
}
