import { Checkbox, Stack, Text } from '@mantine/core'
import React from 'react'

import type { CheckboxProps } from '@mantine/core'

export const CheckboxWithLabel: React.FC<{ description: string } & CheckboxProps> = ({ description, ...props }) => {
  return (
    <Stack>
      <Checkbox {...props} />
      <Text size="sm" ml="lg">
        {description}
      </Text>
    </Stack>
  )
}
