import { Center, Group, Loader, Text } from '@mantine/core'

import type { ReactNode } from 'react'

export function LoadingSpinner(): ReactNode {
  return (
    <Center m="xl" p="xl">
      <Group>
        <Loader variant="dots" />
        <Text>データ取得中です...</Text>
      </Group>
    </Center>
  )
}
