import { Card, Center, Container, Text } from '@mantine/core'

import { AppLayout } from '../components/layout/AppLayout.tsx'

import type { ReactNode } from 'react'

export function Help(): ReactNode {
  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
            <Text fs="italic">TODO...</Text>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}
