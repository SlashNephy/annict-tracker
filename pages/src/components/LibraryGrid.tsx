import { Center, Grid, Group, Loader, Text } from '@mantine/core'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ErrorPage } from './error/ErrorPage.tsx'
import { LibraryEntryFilter } from './work/LibraryEntryFilter.tsx'
import { WorkCard } from './work/WorkCard.tsx'
import { useLibraryEntries } from '../lib/useLibraryEntries.ts'
import { LibraryEntryProvider } from '../lib/useLibraryEntry.tsx'

import type { MantineColProps, MantineGridProps } from '../lib/mantine/types.ts'

export type LibraryGridProps = {
  grid: Omit<MantineGridProps, 'children'>
  col: Omit<MantineColProps, 'children'>
}

export function LibraryGrid(props: LibraryGridProps): React.JSX.Element {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} title="現在 Annict API を利用できません" />}>
      <Suspense fallback={<LibraryGridLoading />}>
        <LibraryGridContent {...props} />
      </Suspense>
    </ErrorBoundary>
  )
}

function LibraryGridContent({ grid, col }: LibraryGridProps): React.JSX.Element {
  const entries = useLibraryEntries()

  return (
    <Grid {...grid}>
      {entries.map((entry) => (
        <LibraryEntryProvider key={entry.id} value={entry}>
          <LibraryEntryFilter>
            <Grid.Col {...col}>
              <WorkCard key={entry.id} withBorder p="lg" radius="md" shadow="sm" />
            </Grid.Col>
          </LibraryEntryFilter>
        </LibraryEntryProvider>
      ))}
    </Grid>
  )
}

function LibraryGridLoading(): React.JSX.Element {
  return (
    <Center m="xl" p="xl">
      <Group>
        <Loader color="pink.6" variant="dots" />
        <Text>データ取得中です...</Text>
      </Group>
    </Center>
  )
}
