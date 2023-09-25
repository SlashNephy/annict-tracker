import type { MantineColorScheme } from '@mantine/core'

export const colorSchemes: MantineColorScheme[] = ['light', 'dark', 'auto']

export const colorSchemeLabels: Record<MantineColorScheme, string> = {
  light: 'ライト',
  dark: 'ダーク',
  auto: 'OS と同期させる',
}
