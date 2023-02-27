import { Anchor, Group, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'

import { isNavbarExpandState } from '../lib/atoms'

import type { AppLink } from './AppLayout'

export function MainLink({ icon, color, label, ...props }: AppLink): React.ReactElement {
  const [isExpand, setIsExpand] = useRecoilState(isNavbarExpandState)

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
      <Anchor
        component={Link}
        {...props}
        onClick={() => {
          setIsExpand(false)
        }}
      >
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
