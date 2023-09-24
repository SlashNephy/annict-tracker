import { Anchor, AppShell, Burger, Card, Container, Group, Text, ThemeIcon, Tooltip } from '@mantine/core'
import { useDisclosure, useDocumentTitle, useMediaQuery } from '@mantine/hooks'
import { IconBrandGithub } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useCheckUpdate } from '../../lib/workers/useCheckUpdate.ts'
import { routes } from '../../routes/router.tsx'

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isNavbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false)
  const isMobile = useMediaQuery('(max-width: 62em)', false)

  const location = useLocation()
  const title = useMemo(() => {
    const link = routes.find(({ route }) => route.path === location.pathname)
    if (link !== undefined) {
      return `${link.label} | annict-tracker`
    }
    return 'annict-tracker'
  }, [location.pathname])
  useDocumentTitle(title)

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
          <Text>annict-tracker</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {routes.map(({ route, label, icon: Icon }) => (
          <Anchor key={route.path} component={Link} mb="lg" to={route.path} onClick={closeNavbar}>
            <Group>
              <Tooltip label={label} position="right">
                <ThemeIcon variant="light">
                  <Icon size={20} />
                </ThemeIcon>
              </Tooltip>

              {}
              {isMobile && <Text>{label}</Text>}
            </Group>
          </Anchor>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

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
