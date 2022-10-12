import { useLocalStorage, useMediaQuery } from '@mantine/hooks'

import type { ColorScheme } from '@mantine/core'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMemorableColorScheme = () => {
  const isOsDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [isDark, setIsDark] = useLocalStorage<boolean>({
    key: 'is-dark-color-scheme',
    defaultValue: isOsDark,
  })

  const toggleColorScheme = (value?: ColorScheme) => {
    switch (value) {
      case 'dark':
        setIsDark(false)
        break
      case 'light':
        setIsDark(true)
        break
      default:
        setIsDark((wasDark) => !wasDark)
    }
  }

  const colorScheme = isDark ? 'dark' : 'light'
  return [colorScheme, toggleColorScheme] as const
}
