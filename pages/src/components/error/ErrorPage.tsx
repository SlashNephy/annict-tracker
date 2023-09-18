import { Alert } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import React from 'react'

import { AppLayout } from '../layout/AppLayout.tsx'

export type ErrorPageProps = {
  error: Error
  title?: string
}

export function ErrorPage({ error, title }: ErrorPageProps): React.JSX.Element {
  return (
    <AppLayout>
      <Alert
        color="red"
        icon={<IconAlertTriangle size={16} />}
        title={title ?? 'annict-tracker で問題が発生しました。'}
      >
        {error.toString()}
      </Alert>
    </AppLayout>
  )
}
