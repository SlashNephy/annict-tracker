import { Checkbox, Stack, Text } from '@mantine/core'
import React from 'react'

import type { CheckboxProps } from '@mantine/core'

export function CheckboxWithLabel({
  description,
  ...props
}: { description: string } & CheckboxProps): React.JSX.Element {
  return (
    <Stack>
      <Checkbox {...props} />
      <Text ml="lg" size="sm">
        {description}
      </Text>
    </Stack>
  )
}
