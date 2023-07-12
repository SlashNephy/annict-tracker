import { Alert, Center, Grid, Group, Loader, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import React from 'react'

import { LibraryEntryFilter } from './work/LibraryEntryFilter.tsx'
import { WorkCard } from './work/WorkCard.tsx'
import { useLibraryEntries } from '../lib/useLibraryEntries.ts'
import { LibraryEntryProvider } from '../lib/useLibraryEntry.tsx'

import type { ColProps, GridProps } from '@mantine/core'

export function LibraryGrid({
  grid,
  col,
}: {
  grid?: Omit<GridProps, 'children'>
  col?: Omit<ColProps, 'children'>
}): React.ReactElement {
  const { entries, isLoading, isError, error } = useLibraryEntries()

  if (isLoading) {
    return (
      <Center m="xl" p="xl">
        <Group>
          <Loader color="pink.6" variant="dots" />
          <Text>データ取得中です...</Text>
        </Group>
      </Center>
    )
  }

  if (isError) {
    return (
      <Alert color="red" icon={<IconAlertTriangle size={16} />} title="現在 Annict API を利用できません">
        {error?.toString()}
      </Alert>
    )
  }

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
