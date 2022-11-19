import { Anchor, Group, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { isNavbarExpandState } from '../lib/atoms'

import type { MantineColor } from '@mantine/core'
import type { LinkProps } from 'next/link'
import type { ReactNode } from 'react'

export type MainLinkProps = { icon: ReactNode; label: string; color?: MantineColor } & LinkProps

export const MainLink: React.FC<MainLinkProps> = ({ icon, color, label, ...props }) => {
  const isExpand = useRecoilValue(isNavbarExpandState)

  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Anchor component={Link} {...props}>
        <Group>
          <Tooltip label={label} position="right">
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>
          </Tooltip>

          {isExpand && <Text size="sm">{label}</Text>}
        </Group>
      </Anchor>
    </UnstyledButton>
  )
}
