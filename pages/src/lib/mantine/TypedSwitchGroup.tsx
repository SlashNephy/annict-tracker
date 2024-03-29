import { Switch } from '@mantine/core'
import React, { useCallback } from 'react'

import type { MantinePropsOf } from './type.ts'

export type TypedSwitchGroupProps<T> = MantinePropsOf<typeof Switch.Group> & {
  value: T[]
  onToggle?(values: T[]): void
}

export function TypedSwitchGroup<T>({
  value,
  onChange,
  onToggle,
  ...props
}: TypedSwitchGroupProps<T>): React.JSX.Element {
  const handleChange = useCallback(
    (value: string[]) => {
      onChange?.(value)
      // TODO: リテラル型に purify する
      // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
      onToggle?.(value as T[])
    },
    [onChange, onToggle]
  )

  return <Switch.Group value={value} onChange={handleChange} {...props} />
}
