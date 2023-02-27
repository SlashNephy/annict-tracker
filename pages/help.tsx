import { Card, Center, Container, Text } from '@mantine/core'
import React from 'react'

import { AppLayout } from '../components/AppLayout'

function Help(): React.ReactElement {
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

export default Help
