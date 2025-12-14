import { useMemo, type ReactNode } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'

import { createAnnictEnvironment } from './environment.ts'

export type RelayEnvironmentProps = {
  bearerToken: string
  children: ReactNode
}

export function AnnictRelayEnvironment({ bearerToken, children }: RelayEnvironmentProps): ReactNode {
  const environment = useMemo(() => {
    return createAnnictEnvironment(bearerToken)
  }, [bearerToken])

  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}
