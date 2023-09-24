import { generateColors } from '@mantine/colors-generator'
import { createTheme, DEFAULT_THEME, mergeMantineTheme } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

import { baseColorAtom } from '../jotai/theme.ts'

import type { MantineTheme } from '@mantine/core'

export function useCustomTheme(): MantineTheme {
  const baseColor = useAtomValue(baseColorAtom)

  return useMemo(() => {
    if (!baseColor) {
      return DEFAULT_THEME
    }

    const override = createTheme({
      primaryColor: 'custom',
      colors: {
        custom: generateColors(baseColor),
      },
    })

    return mergeMantineTheme(DEFAULT_THEME, override)
  }, [baseColor])
}
