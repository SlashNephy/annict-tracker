import { Checkbox, Group, Stack, Text } from '@mantine/core'
import React, { useCallback } from 'react'

import type { ChangeEventHandler } from 'react'
import type { MantinePropsOf } from '../../lib/mantine/type'

export type CheckboxWithLabelProps = Omit<MantinePropsOf<typeof Checkbox>, 'onToggle'> & {
  description: string | React.JSX.Element
  onToggle?(checked: boolean): void
}

export function CheckboxWithLabel({
  description,
  onChange,
  onToggle,
  ...props
}: CheckboxWithLabelProps): React.JSX.Element {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange?.(event)
      onToggle?.(event.currentTarget.checked)
    },
    [onChange, onToggle]
  )

  return (
    <Stack>
      <Checkbox onChange={handleChange} {...props} />
      <Group>
        {typeof description === 'string' ? (
          <Text ml="lg" size="sm">
            {description}
          </Text>
        ) : (
          description
        )}
      </Group>
    </Stack>
  )
}
