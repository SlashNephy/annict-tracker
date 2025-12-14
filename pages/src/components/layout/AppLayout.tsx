import { Anchor, AppShell, Burger, Card, Container, Group, Stack, Text } from '@mantine/core'
import { useDisclosure, useDocumentTitle } from '@mantine/hooks'
import { IconBrandGithub, IconDeviceTv, IconHelp, IconSettings, IconSpeakerphone } from '@tabler/icons-react'
import { useCallback, useMemo, type PropsWithChildren, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { NavbarLinkIcon } from './NavbarLinkIcon.tsx'
import { useIsMobile } from '../../lib/useIsMobile.ts'
import { useCheckUpdate } from '../../lib/workers/useCheckUpdate.ts'
import { routes } from '../../routes/router.tsx'
import { FeedbackModal } from '../error/FeedbackModal.tsx'

export function AppLayout({ children }: PropsWithChildren): ReactNode {
  const [isNavbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure(false)
  const isMobile = useIsMobile()

  const location = useLocation()
  const route = useMemo(() => {
    return routes.find(({ path }) => path === location.pathname)
  }, [location.pathname])

  const [isFeedbackModalOpened, { open: openFeedbackModal, close: closeFeedbackModal }] = useDisclosure(false)
  const handleClickFeedbackIcon = useCallback(() => {
    openFeedbackModal()
    closeNavbar()
  }, [openFeedbackModal, closeNavbar])

  useDocumentTitle(route ? `${route.title} | annict-tracker` : 'annict-tracker')

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
          <Text>{isNavbarOpened || !route ? 'annict-tracker' : route.title}</Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="sm">
          <NavbarLinkIcon component={Link} icon={IconDeviceTv} title="視聴記録" to="/" onClick={closeNavbar} />
          <NavbarLinkIcon component={Link} icon={IconHelp} title="使い方" to="/help" onClick={closeNavbar} />
        </Stack>

        <Stack bottom={0} gap="sm" pos="absolute">
          <NavbarLinkIcon<'a'>
            href="https://github.com/SlashNephy/annict-tracker"
            icon={IconBrandGithub}
            target="_blank"
            title="GitHub"
            onClick={closeNavbar}
          />
          <NavbarLinkIcon<'a'> icon={IconSpeakerphone} title="フィードバック" onClick={handleClickFeedbackIcon} />
          <NavbarLinkIcon component={Link} icon={IconSettings} title="設定" to="/settings" onClick={closeNavbar} />
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
              </Anchor>
              {' '}
              made with &hearts; by
              {' '}
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
