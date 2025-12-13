import { Radio } from '@mantine/core'
import React, { useCallback } from 'react'

import type { MantinePropsOf } from './type.ts'

export type TypedRadioGroupProps<T> = Omit<MantinePropsOf<typeof Radio.Group>, 'onToggle'> & {
  value: T
  onToggle?(value: T): void
}

export function TypedRadioGroup<T>({
  value,
  onChange,
  onToggle,
  ...props
}: TypedRadioGroupProps<T>): React.JSX.Element {
  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value)
      // TODO: リテラル型に purify する
      // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
      onToggle?.(value as T)
    },
    [onChange, onToggle]
  )

  return <Radio.Group value={value} onChange={handleChange} {...props} />
}
