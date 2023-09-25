import { Container } from '@mantine/core'
import { ErrorBoundary } from '@sentry/react'
import React, { Suspense } from 'react'

import { FilterCard } from './FilterCard.tsx'
import { LoadingSpinner } from '../common/LoadingSpinner.tsx'
import { ErrorPage } from '../error/ErrorPage.tsx'
import { ViewerLibrary } from '../library/ViewerLibrary.tsx'

export function LoginUser(): React.JSX.Element {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <ErrorBoundary fallback={({ error }) => <ErrorPage error={error} title="現在 Annict API を利用できません。" />}>
        <Suspense fallback={<LoadingSpinner />}>
          <ViewerLibrary />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
