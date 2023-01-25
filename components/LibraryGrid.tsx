import { Alert, Center, Group, Loader, SimpleGrid, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons'
import React from 'react'

import { LibraryEntryFilter } from './work/LibraryEntryFilter'
import { WorkCard } from './work/WorkCard'
import { useLibraryEntries } from '../lib/useLibraryEntries'
import { LibraryEntryProvider } from '../lib/useLibraryEntry'

import type { SimpleGridProps } from '@mantine/core'

export const LibraryGrid: React.FC<Omit<SimpleGridProps, 'children'>> = (props) => {
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
    <SimpleGrid {...props}>
      {entries.map((entry) => (
        <LibraryEntryProvider key={entry.id} value={entry}>
          <LibraryEntryFilter>
            <WorkCard key={entry.id} shadow="sm" p="lg" radius="md" withBorder />
          </LibraryEntryFilter>
        </LibraryEntryProvider>
      ))}
    </SimpleGrid>
  )
}
