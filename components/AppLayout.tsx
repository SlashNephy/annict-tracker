import { AppShell, Burger, Group, Navbar, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { IconDeviceTv, IconHelp } from '@tabler/icons'
import React from 'react'
import { useRecoilState } from 'recoil'

import { isNavbarExpandState } from '../lib/atoms'
import { useUpdateChecker } from '../lib/useUpdateChecker'
import packageJson from '../package.json'
import { MainLink } from './MainLink'

import type { MainLinkProps } from './MainLink'

const links: MainLinkProps[] = [
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
]

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)
  const theme = useMantineTheme()

  useUpdateChecker()

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbar={
        <Navbar pt="md" width={isExpand ? { sm: 200, lg: 200 } : { sm: 50, lg: 50 }}>
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
      }
    >
      {children}
    </AppShell>
  )
}
