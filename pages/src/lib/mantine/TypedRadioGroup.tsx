import { Radio } from '@mantine/core'
import { useCallback, type ReactNode } from 'react'

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
}: TypedRadioGroupProps<T>): ReactNode {
  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value)
      // TODO: リテラル型に purify する
      // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
      onToggle?.(value as T)
    },
    [onChange, onToggle],
  )

  return <Radio.Group value={value} onChange={handleChange} {...props} />
}
