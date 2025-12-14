import { Anchor, Group, Text, ThemeIcon, Tooltip } from '@mantine/core'

import { useIsMobile } from '../../lib/useIsMobile.ts'

import type { IconProps } from '@tabler/icons-react'
import type { ComponentProps, ElementType, ReactNode } from 'react'

export type NavbarLinkIconProps<C> = ComponentProps<typeof Anchor<C>> & {
  title: string
  icon: ElementType<IconProps>
}

export function NavbarLinkIcon<C>({ title, icon: Icon, ...props }: NavbarLinkIconProps<C>): ReactNode {
  const isMobile = useIsMobile()

  return (
    // @ts-expect-error -- component の型が上手く推論できない
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
