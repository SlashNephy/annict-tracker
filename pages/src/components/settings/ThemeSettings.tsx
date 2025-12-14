import {
  ColorPicker,
  ColorSwatch,
  DEFAULT_THEME,
  Group,
  Radio,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { IconPaint } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import { useCallback, useMemo, type ReactNode } from 'react'

import { customColorAtom, customColorFormatAtom, customColorFormats } from '../../lib/jotai/theme.ts'
import { colorSchemeLabels, colorSchemes } from '../../lib/mantine/colorSchemes.ts'
import { TypedRadioGroup } from '../../lib/mantine/TypedRadioGroup.tsx'

export function ThemeSettings(): ReactNode {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const [customColor, setCustomColor] = useAtom(customColorAtom)
  const [customColorFormat, setCustomColorFormat] = useAtom(customColorFormatAtom)
  const colorSwatches = useMemo(() => Object.values(DEFAULT_THEME.colors).map((c) => c[5]), [])

  const handleClickColorSwatch = useCallback(() => {
    setCustomColorFormat('hex')
  }, [setCustomColorFormat])

  return (
    <Stack>
      <Group>
        <IconPaint />
        <Text>テーマ設定</Text>
      </Group>

      <Stack>
        <Text>カラースキーム</Text>
        <Radio.Group value={colorScheme}>
          <Group>
            {colorSchemes.map((scheme) => (
              <Radio
                key={scheme}
                label={colorSchemeLabels[scheme]}
                value={scheme}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                  setColorScheme(scheme)
                }}
              />
            ))}
          </Group>
        </Radio.Group>

        <Text>カスタムカラー</Text>
        <Text ml="lg" size="sm">
          UI の配色をお好きな色に変更できます。
        </Text>
        <Text ml="lg" size="sm">
          著しく可読性が低下するおそれがありますので、設定の際はご注意ください。
        </Text>
        <Stack>
          <Group justify="center">
            <TypedRadioGroup value={customColorFormat} onToggle={setCustomColorFormat}>
              <Group>
                {customColorFormats.map((format) => (
                  <Radio key={format} label={format.toUpperCase()} value={format} />
                ))}
              </Group>
            </TypedRadioGroup>
          </Group>
          <Group justify="center">
            <ColorPicker
              key={customColorFormat}
              format={customColorFormat}
              swatches={colorSwatches}
              value={customColor}
              onChange={setCustomColor}
              onColorSwatchClick={handleClickColorSwatch}
            />
            <Group>
              <ColorSwatch color={customColor} />
              <Text>{customColor}</Text>
            </Group>
          </Group>
        </Stack>
      </Stack>
    </Stack>
  )
}
