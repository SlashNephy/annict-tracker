import { Container } from '@mantine/core'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FilterCard } from './FilterCard.tsx'
import { LoadingSpinner } from '../common/LoadingSpinner.tsx'
import { ErrorModal } from '../error/ErrorModal.tsx'
import { ViewerLibrary } from '../library/ViewerLibrary.tsx'

export function LoginUser(): React.JSX.Element {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <ErrorBoundary fallbackRender={({ error }) => <ErrorModal error={error} />}>
        <Suspense fallback={<LoadingSpinner />}>
          <ViewerLibrary />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
