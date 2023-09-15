import { Anchor, Group, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { isNavbarExpandState } from '../lib/atoms.ts'

import type { Route } from '../router.tsx'

export function MainLink({ icon: Icon, label, ...props }: Route): React.JSX.Element {
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
        to={props.route.path}
        {...props}
        onClick={() => {
          setIsExpand(false)
        }}
      >
        <Group>
          <Tooltip label={label} position="right">
            <ThemeIcon variant="light">
              <Icon size={16} />
            </ThemeIcon>
          </Tooltip>

          {isExpand && <Text size="sm">{label}</Text>}
        </Group>
      </Anchor>
    </UnstyledButton>
  )
}
