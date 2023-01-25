import { AppShell, Burger, Group, Header, Navbar, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { IconDeviceTv, IconHelp, IconSettings } from '@tabler/icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { MainLink } from './MainLink'
import { isNavbarExpandState } from '../lib/atoms'
import { useSmallViewport } from '../lib/useSmallViewport'
import { useUpdateChecker } from '../lib/useUpdateChecker'
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

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)
  const theme = useMantineTheme()
  const isSmall = useSmallViewport()

  const router = useRouter()
  const title = useMemo(() => {
    const link = links.find((link) => link.href === router.asPath)
    if (link !== undefined) {
      return `${link.label} | ${packageJson.name}`
    } else {
      return packageJson.name
    }
  }, [router.asPath])

  useUpdateChecker()

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      header={
        <>
          {isSmall && (
            <Header height={isExpand ? '100%' : 50}>
              <Group p="xs">
                <Burger
                  opened={isExpand}
                  onClick={() => {
                    setIsExpand((wasExpand) => !wasExpand)
                  }}
                  size="sm"
                  color={theme.colors.gray[6]}
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
                    opened={isExpand}
                    onClick={() => {
                      setIsExpand((wasExpand) => !wasExpand)
                    }}
                    size="sm"
                    color={theme.colors.gray[6]}
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
    >
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </AppShell>
  )
}
