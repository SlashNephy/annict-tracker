import { ActionIcon, Checkbox, HoverCard, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons'
import React from 'react'

import type { CheckboxProps } from '@mantine/core'

export const CheckboxWithHoverCard: React.FC<{ label: string; description: string } & Omit<CheckboxProps, 'label'>> = ({
  label,
  description,
  ...props
}) => {
  return (
    <Checkbox
      label={
        <>
          {label}
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <ActionIcon variant="transparent" ml="0.1em" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
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
