import { Button, Menu } from '@mantine/core'
import {
  IconBrandAmazon,
  IconBrandNetflix,
  IconBrandWindows,
  IconBrandYoutube,
  IconChevronDown,
  IconDeviceTvOld,
  IconMovie,
} from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { hasLength } from 'ts-array-length'

import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type {
  SearchIntegrationKey,
  SearchIntegrationConfig,
  EffectiveSearchIntegrationConfigs,
} from '../../lib/atoms.ts'
import type { LibraryEntryModel } from '../../models/LibraryEntryModel.ts'
import type { ButtonProps } from '@mantine/core'
import type { TablerIconsProps } from '@tabler/icons-react'

type SearchIntegrationAction<K extends SearchIntegrationKey> = {
  title: string
  icon: React.FC<TablerIconsProps>
  search(entry: LibraryEntryModel, config: SearchIntegrationConfig<K>): void
}

const actions: { [K in SearchIntegrationKey]: SearchIntegrationAction<K> } = {
  everything: {
    title: 'Everything',
    icon: IconBrandWindows,
    search: (entry) => {
      const url = `es:${entry.work.title}`
      window.open(url)
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
  d_anime: {
    title: 'dアニメストア',
    icon: IconMovie,
    search: (entry) => {
      const url = `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${encodeURIComponent(
        entry.work.title
      )}&vodTypeList=svod_tvod`
      window.open(url)
    },
  },
  d_anime_niconico: {
    title: 'dアニメストア ニコニコ支店',
    icon: IconMovie,
    search: (entry) => {
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(
        entry.work.title
      )}?channel_id=ch2632720&mode=s&sort=t&order=d&type=video`
      window.open(url)
    },
  },
  abema: {
    title: 'ABEMA',
    icon: IconMovie,
    search: (entry) => {
      const url = `https://abema.tv/search?q=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  netflix: {
    title: 'Netflix',
    icon: IconBrandNetflix,
    search: (entry) => {
      const url = `https://www.netflix.com/search?q=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  prime_video: {
    title: 'Prime Video',
    icon: IconBrandAmazon,
    search: (entry) => {
      const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(entry.work.title)}&i=instant-video`
      window.open(url)
    },
  },
  niconico_channel: {
    title: 'ニコニコチャンネル',
    icon: IconMovie,
    search: (entry) => {
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(entry.work.title)}?type=channel&mode=s`
      window.open(url)
    },
  },
  bandai_channel: {
    title: 'バンダイチャンネル',
    icon: IconMovie,
    search: (entry) => {
      const url = `https://www.b-ch.com/search/text/?search_txt=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  youtube: {
    title: 'YouTube',
    icon: IconBrandYoutube,
    search: (entry) => {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
}

type SearchIntegration<K extends SearchIntegrationKey> = SearchIntegrationAction<K> & {
  config: SearchIntegrationConfig<K>
}

export type FileSearchButtonProps = Omit<ButtonProps, 'disabled' | 'rightIcon'> & {
  configs: EffectiveSearchIntegrationConfigs
}

export function FileSearchButton({ configs, ...props }: FileSearchButtonProps): React.JSX.Element {
  const integrations = useMemo<SearchIntegration<SearchIntegrationKey>[]>(
    () =>
      Object.values(configs).map((config) => ({
        ...actions[config.key],
        config,
      })),
    [configs]
  )

  const { entry } = useLibraryEntry()
  const isDisabled = useMemo(() => {
    // エピソード情報がない
    if (entry.nextEpisode === null) {
      return true
    }

    // まだ放送されていない
    return entry.nextProgramStartAt !== null && new Date() < entry.nextProgramStartAt
  }, [entry])

  // 検索ソースが1つのときはそのまま検索ボタンにする
  if (hasLength(integrations, 1)) {
    const [integration] = integrations

    return (
      <Button
        {...props}
        disabled={isDisabled}
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
        <Button {...props} disabled={isDisabled} rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}>
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
