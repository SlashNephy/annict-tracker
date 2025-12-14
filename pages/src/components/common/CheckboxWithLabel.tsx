import { Checkbox, Group, Stack, Text } from '@mantine/core'
import { useCallback } from 'react'

import type { MantinePropsOf } from '../../lib/mantine/type'
import type { ChangeEventHandler, ReactNode } from 'react'

export type CheckboxWithLabelProps = Omit<MantinePropsOf<typeof Checkbox>, 'onToggle'> & {
  description: string | ReactNode
  onToggle?(checked: boolean): void
}

export function CheckboxWithLabel({
  description,
  onChange,
  onToggle,
  ...props
}: CheckboxWithLabelProps): ReactNode {
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      onChange?.(event)
      onToggle?.(event.currentTarget.checked)
    },
    [onChange, onToggle],
  )

  return (
    <Stack>
      <Checkbox onChange={handleChange} {...props} />
      <Group>
        {typeof description === 'string'
          ? (
              <Text ml="lg" size="sm">
                {description}
              </Text>
            )
          : (
              description
            )}
      </Group>
    </Stack>
  )
}
