import { ErrorModal } from './ErrorModal.tsx'
import { AppLayout } from '../layout/AppLayout.tsx'

import type { ReactNode } from 'react'

export type ErrorPageProps = {
  error: unknown
}

export function ErrorPage({ error }: ErrorPageProps): ReactNode {
  return (
    <AppLayout>
      <ErrorModal error={error} />
    </AppLayout>
  )
}
