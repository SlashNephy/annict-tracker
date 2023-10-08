import { Container } from '@mantine/core'
import React, { Suspense, useCallback } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FilterCard } from './FilterCard.tsx'
import { LoadingSpinner } from '../common/LoadingSpinner.tsx'
import { ErrorModal } from '../error/ErrorModal.tsx'
import { ViewerLibrary } from '../library/ViewerLibrary.tsx'

import type { FallbackProps } from 'react-error-boundary'

export function LoginUser(): React.JSX.Element {
  const fallbackRender = useCallback(({ error }: FallbackProps) => {
    return <ErrorModal error={error} />
  }, [])

  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Suspense fallback={<LoadingSpinner />}>
          <ViewerLibrary />
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
