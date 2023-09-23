import { Anchor, Group, Text, ThemeIcon, Tooltip, UnstyledButton } from '@mantine/core'
import { useAtom } from 'jotai'
import React from 'react'
import { Link } from 'react-router-dom'

import { isNavbarExpandAtom } from '../lib/jotai/navbar.ts'

import type { Route } from '../router.tsx'

export function MainLink({ icon: Icon, label, ...props }: Route): React.JSX.Element {
  const [isExpand, setIsExpand] = useAtom(isNavbarExpandAtom)

  return (
    <UnstyledButton>
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
