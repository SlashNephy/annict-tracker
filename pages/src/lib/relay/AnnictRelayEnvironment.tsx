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

  // @ts-expect-error XXX: 一時的に ignore。要求される ReactNode の型が食い違っている
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
}
