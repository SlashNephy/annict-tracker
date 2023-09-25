import { atomWithStorage } from 'jotai/utils'

export const customColorAtom = atomWithStorage('baseColor', '')

// @mantine/core/lib/components/ColorPicker/ColorPicker.types
export const customColorFormats = ['hex', 'hexa', 'rgba', 'rgb', 'hsl', 'hsla'] as const
export type CustomColorFormat = (typeof customColorFormats)[number]

export const customColorFormatAtom = atomWithStorage<CustomColorFormat>('customColorFormat', 'hex')
