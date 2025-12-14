import { Switch } from '@mantine/core'
import { useCallback, type ReactNode } from 'react'

import type { MantinePropsOf } from './type.ts'

export type TypedSwitchGroupProps<T> = Omit<MantinePropsOf<typeof Switch.Group>, 'onToggle'> & {
  value: T[]
  onToggle?(values: T[]): void
}

export function TypedSwitchGroup<T>({
  value,
  onChange,
  onToggle,
  ...props
}: TypedSwitchGroupProps<T>): ReactNode {
  const handleChange = useCallback(
    (value: string[]) => {
      onChange?.(value)
      // TODO: リテラル型に purify する
      // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
      onToggle?.(value as T[])
    },
    [onChange, onToggle],
  )

  return <Switch.Group value={value} onChange={handleChange} {...props} />
}
