import { Anchor, AppShell, Burger, Card, Container, Group, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useDisclosure, useDocumentTitle, useMediaQuery } from '@mantine/hooks'
import { IconBrandGithub, IconSpeakerphone } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useCheckUpdate } from '../../lib/workers/useCheckUpdate.ts'
import { routes } from '../../routes/router.tsx'
import { FeedbackModal } from '../error/FeedbackModal.tsx'

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isNavbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 62em)', false)

  const location = useLocation()
  const route = useMemo(() => {
    return routes.find(({ route }) => route.path === location.pathname)
  }, [location.pathname])

  const [isFeedbackModalOpened, { open: openFeedbackModal, close: closeFeedbackModal }] = useDisclosure(false)

  useDocumentTitle(route ? `${route.label} | annict-tracker` : 'annict-tracker')

  useCheckUpdate()

  return (
    <AppShell
      header={{ height: 50, collapsed: !isMobile }}
      navbar={{
        width: isMobile ? 9999 : 60,
        breakpoint: 'sm',
        collapsed: { mobile: !isNavbarOpened, desktop: isMobile ? !isNavbarOpened : false },
      }}
    >
      <AppShell.Header>
        <Group p="xs">
          <Burger opened={isNavbarOpened} size="sm" onClick={toggleNavbar} />
          <Text>{isNavbarOpened ? 'annict-tracker' : route?.label}</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="sm">
          {routes.map(({ route, label, icon: Icon }) => (
            <Anchor key={route.path} component={Link} mb="lg" to={route.path} onClick={closeNavbar}>
              <Group>
                <Tooltip label={label} position="right">
                  <ThemeIcon variant="light">
                    <Icon size={20} />
                  </ThemeIcon>
                </Tooltip>
                {isMobile && <Text>{label}</Text>}
              </Group>
            </Anchor>
          ))}
        </Stack>
        <Stack bottom={0} gap="sm" pos="absolute">
          <Anchor
            mb="lg"
            onClick={() => {
              openFeedbackModal()
              closeNavbar()
            }}
          >
            <Group>
              <Tooltip label="フィードバック" position="right">
                <ThemeIcon variant="light">
                  <IconSpeakerphone size={20} />
                </ThemeIcon>
              </Tooltip>
              {isMobile && <Text>フィードバック</Text>}
            </Group>
          </Anchor>

          <Anchor
            mb="lg"
            onClick={() => {
              window.open('https://github.com/SlashNephy/annict-tracker', '_blank')
              closeNavbar()
            }}
          >
            <Group>
              <Tooltip label="GitHub" position="right">
                <ThemeIcon variant="light">
                  <IconBrandGithub size={20} />
                </ThemeIcon>
              </Tooltip>
              {isMobile && <Text>GitHub</Text>}
            </Group>
          </Anchor>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
        <FeedbackModal isOpened={isFeedbackModalOpened} onClose={closeFeedbackModal} />
      </AppShell.Main>

      <AppShell.Footer pb="sm" pos="relative" withBorder={false}>
        <Container>
          <Card m="md">
            <Text>
              <IconBrandGithub style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }} />
              <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
                annict-tracker
              </Anchor>{' '}
              made with &hearts; by{' '}
              <Anchor href="https://github.com/SlashNephy" target="_blank">
                @SlashNephy
              </Anchor>
              .
            </Text>
          </Card>
        </Container>
      </AppShell.Footer>
    </AppShell>
  )
}
