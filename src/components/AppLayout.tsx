import { AppShell, Burger, Group, Header, Navbar, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconDeviceTv, IconHelp, IconSettings } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { MainLink } from './MainLink.tsx'
import packageJson from '../../package.json'
import { isNavbarExpandState } from '../lib/atoms.ts'
import { useUpdateChecker } from '../lib/useUpdateChecker.ts'

import type { AnchorProps, MantineColor } from '@mantine/core'
import type { ReactNode } from 'react'
import type { LinkProps } from 'react-router-dom'

export type AppLink = {
  icon: ReactNode
  label: string
  color?: MantineColor
} & AnchorProps &
  LinkProps

const links: AppLink[] = [
  {
    icon: <IconDeviceTv size={16} />,
    label: '視聴記録',
    to: '/',
  },
  {
    icon: <IconHelp size={16} />,
    label: '使い方',
    to: '/help',
  },
  {
    icon: <IconSettings size={16} />,
    label: '設定',
    to: '/settings',
  },
]

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  const location = useLocation()
  const title = useMemo(() => {
    const link = links.find((l) => l.to === location.pathname)
    if (link !== undefined) {
      return `${link.label} | ${packageJson.name}`
    }
    return packageJson.name
  }, [location.pathname])

  useUpdateChecker()

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
                <Text>{packageJson.name}</Text>
              </Group>

              {isExpand && (
                <Group>
                  {links.map((link) => (
                    <MainLink key={link.label} {...link} />
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
                  {isExpand && <Text>{packageJson.name}</Text>}
                </Group>
              </Navbar.Section>
              <Navbar.Section grow component={ScrollArea} mt="sm" style={{ overflow: 'visible' }}>
                {links.map((link) => (
                  <MainLink key={link.label} {...link} />
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
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </AppShell>
  )
}
