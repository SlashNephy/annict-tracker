import { Card, Center, Container, Text } from '@mantine/core'
import React from 'react'

import { AppLayout } from '../components/AppLayout'

const Help: React.FC = () => {
  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card shadow="sm" p="xl" radius="md" mb="xl" mt="xl" withBorder>
            <Text italic>TODO...</Text>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}

export default Help
