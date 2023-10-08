import { Checkbox, Group, Stack, Text } from '@mantine/core'
import React, { useCallback } from 'react'

import type { CheckboxProps } from '@mantine/core'
import type { ChangeEventHandler } from 'react'

export type CheckboxWithLabelProps = {
  description: string | React.JSX.Element
  onToggle?(checked: boolean): void
} & CheckboxProps

export function CheckboxWithLabel({
  description,
  onChange,
  onToggle,
  ...props
}: CheckboxWithLabelProps): React.JSX.Element {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange?.(event)
      onToggle?.(event.target.checked)
    },
    [onChange, onToggle]
  )

  return (
    <Stack>
      <Checkbox onChange={handleChange} {...props} />
      <Group>
        <Text ml="lg" size="sm">
          {description}
        </Text>
      </Group>
    </Stack>
  )
}
