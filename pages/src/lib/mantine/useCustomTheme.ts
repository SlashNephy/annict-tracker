import { generateColors } from '@mantine/colors-generator'
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { customColorAtom } from '../jotai/theme.ts'

import type { MantineTheme } from '@mantine/core'

export function useCustomTheme(): MantineTheme {
  const customColor = useAtomValue(customColorAtom)

  return useMemo(() => {
    if (!customColor) {
      return DEFAULT_THEME
    }

    const override = createTheme({
      primaryColor: 'custom',
      colors: {
        custom: generateColors(customColor),
      },
    })

    return mergeMantineTheme(DEFAULT_THEME, override)
  }, [customColor])
}
