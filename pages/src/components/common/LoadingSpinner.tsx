import { Center, Group, Loader, Text } from '@mantine/core'
import React from 'react'

export function LoadingSpinner(): React.JSX.Element {
  return (
    <Center m="xl" p="xl">
      <Group>
        <Loader variant="dots" />
        <Text>データ取得中です...</Text>
      </Group>
    </Center>
  )
}
