import { Alert, Center, Grid, Group, Loader, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons'
import React from 'react'

import { LibraryEntryFilter } from './work/LibraryEntryFilter'
import { WorkCard } from './work/WorkCard'
import { useLibraryEntries } from '../lib/useLibraryEntries'
import { LibraryEntryProvider } from '../lib/useLibraryEntry'

import type { GridProps, ColProps } from '@mantine/core'

export const LibraryGrid: React.FC<{ grid?: Omit<GridProps, 'children'>; col?: Omit<ColProps, 'children'> }> = (
  props
) => {
  const { entries, isLoading, isError, error } = useLibraryEntries()

  if (isLoading) {
    return (
      <Center p="xl" m="xl">
        <Group>
          <Loader variant="dots" color="pink.6" />
          <Text>データ取得中です...</Text>
        </Group>
      </Center>
    )
  }

  if (isError) {
    return (
      <Alert icon={<IconAlertTriangle size={16} />} title="現在 Annict API を利用できません" color="red">
        {error?.toString()}
      </Alert>
    )
  }

  return (
    <Grid {...props.grid}>
      {entries.map((entry) => (
        <LibraryEntryProvider key={entry.id} value={entry}>
          <LibraryEntryFilter>
            <Grid.Col {...props.col}>
              <WorkCard key={entry.id} shadow="sm" p="lg" radius="md" withBorder />
            </Grid.Col>
          </LibraryEntryFilter>
        </LibraryEntryProvider>
      ))}
    </Grid>
  )
}
