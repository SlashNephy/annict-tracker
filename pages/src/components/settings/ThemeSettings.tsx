import {
  Center,
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
import React from 'react'

import { customColorAtom, customColorFormatAtom, customColorFormats } from '../../lib/jotai/theme.ts'
import { colorSchemeLabels, colorSchemes } from '../../lib/mantine/colorSchemes.ts'

import type { CustomColorFormat } from '../../lib/jotai/theme.ts'

export function ThemeSettings(): React.JSX.Element {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const [customColor, setCustomColor] = useAtom(customColorAtom)
  const [customColorFormat, setCustomColorFormat] = useAtom(customColorFormatAtom)

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
                onClick={() => {
                  setColorScheme(scheme)
                }}
              />
            ))}
          </Group>
        </Radio.Group>

        <Text>カスタムカラー</Text>
        <Text size="sm">UI の配色をお好きな色に変更できます。</Text>
        <Text size="sm">著しく可読性が低下するおそれがありますので、設定の際はご注意ください。</Text>
        <Center>
          <Stack>
            <Group>
              <Radio.Group
                value={customColorFormat}
                onChange={(value) => {
                  setCustomColorFormat(value as CustomColorFormat)
                }}
              >
                <Group>
                  {customColorFormats.map((format) => (
                    <Radio key={format} label={format.toUpperCase()} value={format} />
                  ))}
                </Group>
              </Radio.Group>
            </Group>
            <Group>
              <ColorPicker
                format={customColorFormat}
                swatches={Object.values(DEFAULT_THEME.colors).map((c) => c[5])}
                value={customColor}
                onChange={setCustomColor}
                onColorSwatchClick={() => {
                  setCustomColorFormat('hex')
                }}
              />
              <Group>
                <ColorSwatch color={customColor} />
                <Text>{customColor}</Text>
              </Group>
            </Group>
          </Stack>
        </Center>
      </Stack>
    </Stack>
  )
}
