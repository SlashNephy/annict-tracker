// export されていないため、コピペしてきた型定義
// https://github.com/mantinedev/mantine/blob/9c6ba800f368b7bd196cf81509fe5bf393a2f92e/src/mantine-core/src/core/factory/create-polymorphic-component.ts

import type React from 'react'

type ExtendedProps<Props = unknown, OverrideProps = unknown> = OverrideProps & Omit<Props, keyof OverrideProps>

type ElementType = keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>

type PropsOf<C extends ElementType> = React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type ComponentProp<C> = {
  component?: C
}

type InheritedProps<C extends ElementType, Props = unknown> = ExtendedProps<PropsOf<C>, Props>

type PolymorphicRef<C> = C extends React.ElementType ? React.ComponentPropsWithRef<C>['ref'] : never

type PolymorphicComponentProps<C, Props = unknown> = C extends React.ElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & {
    ref?: PolymorphicRef<C>
    renderRoot?(props: unknown): unknown
  }
  : Props & { component: React.ElementType, renderRoot?(props: Record<string, unknown>): unknown }

export type MantinePropsOf<C, Props = unknown> = PolymorphicComponentProps<C, Props>
