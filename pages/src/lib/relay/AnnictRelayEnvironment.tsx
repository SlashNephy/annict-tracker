import React, { useMemo } from 'react'
import { RelayEnvironmentProvider } from 'react-relay'

import { createAnnictEnvironment } from './environment.ts'

export type RelayEnvironmentProps = {
  bearerToken: string
  children: React.JSX.Element
}

export function AnnictRelayEnvironment({ bearerToken, children }: RelayEnvironmentProps): React.JSX.Element {
  const environment = useMemo(() => {
    return createAnnictEnvironment(bearerToken)
  }, [bearerToken])

  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}
