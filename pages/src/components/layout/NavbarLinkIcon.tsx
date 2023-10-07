import { Anchor, Group, Text, ThemeIcon, Tooltip } from '@mantine/core'
import React from 'react'

import { useIsMobile } from '../../lib/useIsMobile.ts'

import type { MantinePropsOf } from '../../lib/mantine/type.ts'
import type { AnchorProps } from '@mantine/core'
import type { TablerIconsProps } from '@tabler/icons-react'

export type NavbarLinkIconProps<C> = MantinePropsOf<C, AnchorProps> & {
  title: string
  icon: React.FC<TablerIconsProps>
}

export function NavbarLinkIcon<C>({ title, icon: Icon, ...props }: NavbarLinkIconProps<C>): React.JSX.Element {
  const isMobile = useIsMobile()

  return (
    <Anchor mb="lg" {...props}>
      <Group>
        <Tooltip label={title} position="right">
          <ThemeIcon variant="light">
            <Icon size={20} />
          </ThemeIcon>
        </Tooltip>
        {isMobile && <Text>{title}</Text>}
      </Group>
    </Anchor>
  )
}
