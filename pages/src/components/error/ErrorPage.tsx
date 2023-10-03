import React from 'react'

import { ErrorModal } from './ErrorModal.tsx'
import { AppLayout } from '../layout/AppLayout.tsx'

export type ErrorPageProps = {
  error: unknown
}

export function ErrorPage({ error }: ErrorPageProps): React.JSX.Element {
  return (
    <AppLayout>
      <ErrorModal error={error} />
    </AppLayout>
  )
}
