import type { ButtonProps, ColProps, GridProps } from '@mantine/core'
import type { PolymorphicComponentProps } from '@mantine/utils'

export type MantineButtonProps = PolymorphicComponentProps<'button', ButtonProps>
export type MantineColProps = PolymorphicComponentProps<'div', ColProps>
export type MantineGridProps = PolymorphicComponentProps<'div', GridProps>
