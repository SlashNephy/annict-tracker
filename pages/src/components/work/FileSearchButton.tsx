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
import { useQuery } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { hasLength } from 'ts-array-length'

import { annictChannelIds, fetchAnnictVodData } from '../../lib/services/annict.ts'
import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type {
  SearchIntegrationKey,
  SearchIntegrationConfig,
  EffectiveSearchIntegrationConfigs,
} from '../../lib/atoms.ts'
import type { AnnictVodData } from '../../lib/services/annict.ts'
import type { LibraryEntryModel } from '../../models/LibraryEntryModel.ts'
import type { ButtonProps } from '@mantine/core'
import type { TablerIconsProps } from '@tabler/icons-react'

type SearchIntegrationActionContext<K extends SearchIntegrationKey> = {
  entry: LibraryEntryModel
  config: SearchIntegrationConfig<K>
  vods?: AnnictVodData[]
}

type SearchIntegrationAction<K extends SearchIntegrationKey> = {
  title: string
  type: 'search' | 'vod'
  vod?: AnnictVodData
  icon: React.FC<TablerIconsProps>
  isAvailable(context: SearchIntegrationActionContext<K>): boolean
  search(context: SearchIntegrationActionContext<K>): void
}

const actions: { [K in SearchIntegrationKey]: SearchIntegrationAction<K> } = {
  everything: {
    title: 'Everything',
    type: 'search',
    icon: IconBrandWindows,
    isAvailable(): boolean {
      return window.navigator.userAgent.toLowerCase().includes('windows')
    },
    search: ({ entry }) => {
      const url = `es:${entry.work.title}`
      window.open(url)
    },
  },
  epgstation: {
    title: 'EPGStation',
    type: 'search',
    icon: IconDeviceTvOld,
    isAvailable({ config }): boolean {
      try {
        return !!new URL(config.url)
      } catch (_) {
        return false
      }
    },
    search: ({ entry, config }) => {
      const url = new URL(config.url)
      url.hash = `#/recorded?keyword=${encodeURIComponent(entry.work.title)}`
      console.log(url.toString())
      window.open(url.toString())
    },
  },
  d_anime: {
    title: 'dアニメストア',
    type: 'vod',
    icon: IconMovie,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId && x.channel_id === annictChannelIds.d_anime && x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://animestore.docomo.ne.jp/animestore/ci_pc?workId=${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${encodeURIComponent(
        entry.work.title
      )}&vodTypeList=svod_tvod`
      window.open(url)
    },
  },
  d_anime_niconico: {
    title: 'dアニメストア ニコニコ支店',
    type: 'vod',
    icon: IconMovie,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId &&
          x.channel_id === annictChannelIds.d_anime_niconico &&
          x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://www.nicovideo.jp/series/${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(
        entry.work.title
      )}?channel_id=ch2632720&mode=s&sort=t&order=d&type=video`
      window.open(url)
    },
  },
  abema: {
    title: 'ABEMA',
    type: 'vod',
    icon: IconMovie,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) => x.work_id === entry.work.annictId && x.channel_id === annictChannelIds.abema && x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://abema.tv/video/title/${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://abema.tv/search?q=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  netflix: {
    title: 'Netflix',
    type: 'vod',
    icon: IconBrandNetflix,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId && x.channel_id === annictChannelIds.netflix && x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://www.netflix.com/title/${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://www.netflix.com/search?q=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  prime_video: {
    title: 'Prime Video',
    type: 'vod',
    icon: IconBrandAmazon,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId && x.channel_id === annictChannelIds.prime_video && x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://www.amazon.co.jp/dp/${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(entry.work.title)}&i=instant-video`
      window.open(url)
    },
  },
  niconico_channel: {
    title: 'ニコニコチャンネル',
    type: 'vod',
    icon: IconMovie,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId &&
          x.channel_id === annictChannelIds.niconico_channel &&
          x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://ch.nicovideo.jp/${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(entry.work.title)}?type=channel&mode=s`
      window.open(url)
    },
  },
  bandai_channel: {
    title: 'バンダイチャンネル',
    type: 'vod',
    icon: IconMovie,
    isAvailable({ entry, vods }): boolean {
      this.vod = vods?.find(
        (x) =>
          x.work_id === entry.work.annictId &&
          x.channel_id === annictChannelIds.bandai_channel &&
          x.vod_code !== undefined
      )
      return this.vod !== undefined
    },
    search({ entry }) {
      // 参照可能な場合は直接開く
      if (this.vod !== undefined) {
        const url = `https://www.b-ch.com/ttl/index.php?ttl_c=${this.vod.vod_code}`
        window.open(url)
        return
      }

      // 単に検索させる
      const url = `https://www.b-ch.com/search/text/?search_txt=${encodeURIComponent(entry.work.title)}`
      window.open(url)
    },
  },
  youtube: {
    title: 'YouTube',
    type: 'search',
    icon: IconBrandYoutube,
    isAvailable(): boolean {
      return true
    },
    search: ({ entry }) => {
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

  const { data: vods } = useQuery(['vods'], async () => await fetchAnnictVodData())

  // 検索ソースが1つのときはそのまま検索ボタンにする
  if (hasLength(integrations, 1)) {
    const [integration] = integrations

    return (
      <Button
        {...props}
        disabled={isDisabled}
        onClick={() => {
          integration.search({ entry, config: integration.config, vods })
        }}
      >
        {integration.title}
      </Button>
    )
  }

  return (
    <Menu withinPortal position="bottom-start" transitionProps={{ transition: 'pop-top-right' }} width={220}>
      <Menu.Target>
        <Button {...props} disabled={isDisabled} rightIcon={<IconChevronDown size="1.05rem" stroke={1.5} />}>
          検索
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {integrations
          .filter((integration) => integration.isAvailable({ entry, config: integration.config, vods }))
          .map((integration) => {
            const Icon = integration.icon
            return (
              <Menu.Item
                key={integration.title}
                icon={<Icon size="1rem" stroke={1.5} />}
                onClick={() => {
                  integration.search({ entry, config: integration.config, vods })
                }}
              >
                {`${integration.title} で${integration.type === 'search' ? '検索' : '視聴'}`}
              </Menu.Item>
            )
          })}
      </Menu.Dropdown>
    </Menu>
  )
}
