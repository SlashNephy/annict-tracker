import { AppShell, Burger, Group, Text, useMantineTheme } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useAtom } from 'jotai'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { isNavbarExpandState } from '../../lib/recoil/navbar.ts'
import { useCheckUpdate } from '../../lib/useCheckUpdate.ts'
import { routes } from '../../router.tsx'
import { MainLink } from '../MainLink.tsx'

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isExpand, setIsExpand] = useAtom(isNavbarExpandState)
  const theme = useMantineTheme()

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
    <AppShell header={{ height: 50 }} navbar={{ width: { base: isExpand ? 200 : 50 }, breakpoint: 'sm' }}>
      <AppShell.Header>
        <Group p="xs">
          <Burger
            color={theme.colors.gray[6]}
            opened={isExpand}
            size="sm"
            onClick={() => {
              setIsExpand((wasExpand) => !wasExpand)
            }}
          />
          <Text>annict-tracker</Text>
        </Group>

        {isExpand && (
          <Group>
            {routes.map((r) => (
              <MainLink key={r.route.path} {...r} />
            ))}
          </Group>
        )}
      </AppShell.Header>

      <AppShell.Navbar pt="md">
        <Group p="xs">
          <Burger
            color={theme.colors.gray[6]}
            opened={isExpand}
            size="sm"
            onClick={() => {
              setIsExpand((wasExpand) => !wasExpand)
            }}
          />
          {isExpand && <Text>annict-tracker</Text>}
        </Group>

        {routes.map((r) => (
          <MainLink key={r.route.path} {...r} />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
