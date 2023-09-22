import type {
  AnchorProps,
  BadgeProps,
  ButtonProps,
  ColProps,
  GridProps,
  ImageProps,
  TextProps,
  TitleProps,
} from '@mantine/core'
import type { PolymorphicComponentProps } from '@mantine/utils'

export type MantineTextProps = PolymorphicComponentProps<'div', TextProps>
export type MantineButtonProps = PolymorphicComponentProps<'button', ButtonProps>
export type MantineColProps = PolymorphicComponentProps<'div', ColProps>
export type MantineGridProps = PolymorphicComponentProps<'div', GridProps>
export type MantineBadgeProps = PolymorphicComponentProps<'div', BadgeProps>
export type MantineImageProps = PolymorphicComponentProps<'div', ImageProps>
export type MantineTitleProps = PolymorphicComponentProps<'h1', TitleProps>
export type MantineAnchorProps = PolymorphicComponentProps<'a', AnchorProps>
