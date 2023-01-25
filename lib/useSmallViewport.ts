import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const useSmallViewport = (): boolean => {
  const theme = useMantineTheme()
  return useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
}
