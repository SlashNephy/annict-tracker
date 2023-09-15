import { AppShell, Burger, Group, Header, Navbar, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { useDocumentTitle, useMediaQuery } from '@mantine/hooks'
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { isNavbarExpandState } from '../../lib/atoms.ts'
import { useCheckUpdate } from '../../lib/useCheckUpdate.ts'
import { routes } from '../../router.tsx'
import { MainLink } from '../MainLink.tsx'

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

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
      header={
        <>
          {isSmall && (
            <Header height={isExpand ? '100%' : 50}>
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
            </Header>
          )}
        </>
      }
      navbar={
        <>
          {!isSmall && (
            <Navbar pt="md" width={{ base: isExpand ? 200 : 50 }}>
              <Navbar.Section>
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
              </Navbar.Section>
              <Navbar.Section grow component={ScrollArea} mt="sm" style={{ overflow: 'visible' }}>
                {routes.map((r) => (
                  <MainLink key={r.route.path} {...r} />
                ))}
              </Navbar.Section>
            </Navbar>
          )}
        </>
      }
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
    >
      {children}
    </AppShell>
  )
}
