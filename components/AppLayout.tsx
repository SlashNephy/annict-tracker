import { AppShell, Burger, Group, Header, Navbar, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconDeviceTv, IconHelp, IconSettings } from '@tabler/icons-react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { MainLink } from './MainLink.tsx'
import { isNavbarExpandState } from '../lib/atoms.ts'
import { useUpdateChecker } from '../lib/useUpdateChecker.ts'
import packageJson from '../package.json'

import type { AnchorProps, MantineColor } from '@mantine/core'
import type { LinkProps } from 'next/link'
import type { ReactNode } from 'react'

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
    href: '/',
  },
  {
    icon: <IconHelp size={16} />,
    label: '使い方',
    href: '/help',
  },
  {
    icon: <IconSettings size={16} />,
    label: '設定',
    href: '/settings',
  },
]

export function AppLayout({ children }: React.PropsWithChildren): React.JSX.Element {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  const router = useRouter()
  const title = useMemo(() => {
    const link = links.find((l) => l.href === router.asPath)
    if (link !== undefined) {
      return `${link.label} | ${packageJson.name}`
    }
    return packageJson.name
  }, [router.asPath])

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
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </AppShell>
  )
}
