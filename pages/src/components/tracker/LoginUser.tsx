import { Container } from '@mantine/core'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { LoadingSpinner } from '../common/LoadingSpinner.tsx'
import { ErrorPage } from '../error/ErrorPage.tsx'
import { FilterCard } from '../FilterCard.tsx'
import { FooterCard } from '../FooterCard.tsx'
import { ViewerLibrary } from '../library/ViewerLibrary.tsx'

export function LoginUser(): React.JSX.Element {
  return (
    <Container size="xl">
      <FilterCard withBorder mb="xl" mt="xl" p="lg" radius="md" shadow="sm" />
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorPage error={error} title="現在 Annict API を利用できません" />}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ViewerLibrary />
        </Suspense>
      </ErrorBoundary>
      <FooterCard mb="md" mt="md" />
    </Container>
  )
}