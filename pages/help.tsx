import { Card, Center, Container, Text } from '@mantine/core'
import React from 'react'

import { AppLayout } from '../components/AppLayout'

export default function Help(): React.JSX.Element {
  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
            <Text italic>TODO...</Text>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}
