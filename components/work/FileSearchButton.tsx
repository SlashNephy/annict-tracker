import { Button, Menu } from '@mantine/core'
import { IconBrandWindows, IconChevronDown, IconDeviceTvOld } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { hasLength } from 'ts-array-length'

import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type { SearchIntegrationKey, SearchIntegrationConfig } from '../../lib/atoms.ts'
import type { LibraryEntryModel } from '../../models/LibraryEntryModel.ts'
import type { ButtonProps } from '@mantine/core'
import type { TablerIconsProps } from '@tabler/icons-react'

type SearchIntegrationAction<K extends SearchIntegrationKey> = {
  title: string
  icon: React.FC<TablerIconsProps>
  search(entry: LibraryEntryModel, config: SearchIntegrationConfig & { key: K }): void
}

const actions: { [K in SearchIntegrationKey]: SearchIntegrationAction<K> } = {
  everything: {
    title: 'Everything',
    icon: IconBrandWindows,
    search: (entry) => {
      window.open(`es:${entry.work.title}`)
    },
  },
  epgstation: {
    title: 'EPGStation',
    icon: IconDeviceTvOld,
    search: (entry, config) => {
      const url = new URL(config.url)
      url.hash = `#/recorded?keyword=${encodeURIComponent(entry.work.title)}`
      console.log(url.toString())
      window.open(url.toString())
    },
  },
}

type SearchIntegration<K extends SearchIntegrationKey> = SearchIntegrationAction<K> & {
  config: SearchIntegrationConfig & { key: K }
}

export type FileSearchButtonProps = Omit<ButtonProps, 'disabled' | 'rightIcon'> & {
  configs: SearchIntegrationConfig[]
}

export function FileSearchButton({ configs, ...props }: FileSearchButtonProps): React.JSX.Element {
  const integrations = useMemo<SearchIntegration<SearchIntegrationKey>[]>(
    () =>
      configs.map((x) => ({
        ...actions[x.key],
        config: x,
      })),
    [configs]
  )
  const { entry } = useLibraryEntry()

  // 検索ソースが1つのときはそのまま検索ボタンにする
  if (hasLength(integrations, 1)) {
    const [integration] = integrations

    return (
      <Button
        {...props}
        onClick={() => {
          integration.search(entry, integration.config)
        }}
      >
        {integration.title}
      </Button>
    )
  }

  return (
    <Menu withinPortal position="bottom-start" transition="pop-top-right" width={220}>
      <Menu.Target>
        <Button {...props} rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}>
          検索
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {integrations.map((integration) => {
          const Icon = integration.icon
          return (
            <Menu.Item
              key={integration.title}
              icon={<Icon size="1rem" stroke={1.5} />}
              onClick={() => {
                integration.search(entry, integration.config)
              }}
            >
              {`${integration.title} で検索`}
            </Menu.Item>
          )
        })}
      </Menu.Dropdown>
    </Menu>
  )
}
