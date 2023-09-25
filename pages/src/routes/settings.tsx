import { Card, Center, Container, Divider, Stack } from '@mantine/core'
import React from 'react'

import { AppLayout } from '../components/layout/AppLayout.tsx'
import { GeneralSettings } from '../components/settings/GeneralSettings.tsx'
import { IntegrationSettings } from '../components/settings/IntegrationSettings.tsx'
import { ThemeSettings } from '../components/settings/ThemeSettings.tsx'
import { UserSettings } from '../components/settings/UserSettings.tsx'

export function Settings(): React.JSX.Element {
  return (
    <AppLayout>
      <Container mt="xl">
        <Center>
          <Card withBorder mb="xl" mt="xl" p="xl" radius="md" shadow="sm">
            <Stack>
              <UserSettings />
              <Divider />
              <GeneralSettings />
              <Divider />
              <ThemeSettings />
              <Divider />
              <IntegrationSettings />
            </Stack>
          </Card>
        </Center>
      </Container>
    </AppLayout>
  )
}
