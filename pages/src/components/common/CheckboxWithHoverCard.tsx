import { ActionIcon, Checkbox, HoverCard, Text } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import React, { useCallback } from 'react'

import type { ChangeEventHandler } from 'react'
import type { MantinePropsOf } from '../../lib/mantine/type'

export type CheckboxWithHoverCardProps = Omit<MantinePropsOf<typeof Checkbox>, 'onToggle'> & {
  label: string | React.JSX.Element
  description: string | React.JSX.Element
  onToggle?(checked: boolean): void
}

export function CheckboxWithHoverCard({
  label,
  description,
  onChange,
  onToggle,
  ...props
}: CheckboxWithHoverCardProps): React.JSX.Element {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange?.(event)
      onToggle?.(event.currentTarget.checked)
    },
    [onChange, onToggle]
  )

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
      onChange={handleChange}
      {...props}
    />
  )
}
