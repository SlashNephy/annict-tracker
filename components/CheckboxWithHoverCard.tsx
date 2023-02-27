import { ActionIcon, Checkbox, HoverCard, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons'
import React from 'react'

import type { CheckboxProps } from '@mantine/core'

export function CheckboxWithHoverCard({
  label,
  description,
  ...props
}: { label: string; description: string } & Omit<CheckboxProps, 'label'>): React.ReactElement {
  return (
    <Checkbox
      label={
        <>
          {label}
          <HoverCard shadow="md" width={280}>
            <HoverCard.Target>
              <ActionIcon ml="0.1em" style={{ display: 'inline-block', verticalAlign: 'middle' }} variant="transparent">
                <IconInfoCircle size={16} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">{description}</Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </>
      }
      {...props}
    />
  )
}
