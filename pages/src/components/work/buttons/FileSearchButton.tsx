import { Button, Menu } from '@mantine/core'
import {
  IconBrandAmazon,
  IconBrandNetflix,
  IconBrandWindows,
  IconBrandYoutube,
  IconChevronDown,
  IconDeviceTvOld,
  IconMovie,
  IconSearch,
} from '@tabler/icons-react'
import { useMemo } from 'react'
import { graphql, useFragment } from 'react-relay'
import { hasLength } from 'ts-array-length'

import { useShouldDisableButton } from './useShouldDisableButton.ts'

import type {
  EffectiveSearchIntegrationConfigs,
  SearchIntegrationConfig,
  SearchIntegrationKey,
} from './useIntegrationConfigs.ts'
import type { FileSearchButton_LibraryEntry$key } from '../../../__generated__/FileSearchButton_LibraryEntry.graphql.ts'
import type { IconProps } from '@tabler/icons-react'
import type { ElementType, ReactNode } from 'react'

type SearchIntegrationActionContext<K extends SearchIntegrationKey> = {
  work: { title: string }
  config: SearchIntegrationConfig<K>
}

type SearchIntegrationAction<K extends SearchIntegrationKey> = {
  title: string
  icon: ElementType<IconProps>
  isAvailable(context: SearchIntegrationActionContext<K>): boolean
  search(context: SearchIntegrationActionContext<K>): void
}

const actions: { [K in SearchIntegrationKey]: SearchIntegrationAction<K> } = {
  everything: {
    title: 'Everything',
    icon: IconBrandWindows,
    isAvailable(): boolean {
      return window.navigator.userAgent.toLowerCase().includes('windows')
    },
    search: ({ work }) => {
      const url = `es:${work.title}`
      window.open(url)
    },
  },
  epgstation: {
    title: 'EPGStation',
    icon: IconDeviceTvOld,
    isAvailable({ config }): boolean {
      try {
        return !!new URL(config.url)
      } catch (_) {
        return false
      }
    },
    search: ({ work, config }) => {
      const url = new URL(config.url)
      url.hash = `#/recorded?keyword=${encodeURIComponent(work.title)}`
      window.open(url.toString())
    },
  },
  d_anime: {
    title: 'dアニメストア',
    icon: IconMovie,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://animestore.docomo.ne.jp/animestore/sch_pc?searchKey=${encodeURIComponent(
        work.title,
      )}&vodTypeList=svod_tvod`
      window.open(url)
    },
  },
  d_anime_niconico: {
    title: 'dアニメストア ニコニコ支店',
    icon: IconMovie,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(
        work.title,
      )}?channel_id=ch2632720&mode=s&sort=t&order=d&type=video`
      window.open(url)
    },
  },
  abema: {
    title: 'ABEMA',
    icon: IconMovie,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://abema.tv/search?q=${encodeURIComponent(work.title)}`
      window.open(url)
    },
  },
  netflix: {
    title: 'Netflix',
    icon: IconBrandNetflix,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://www.netflix.com/search?q=${encodeURIComponent(work.title)}`
      window.open(url)
    },
  },
  prime_video: {
    title: 'Prime Video',
    icon: IconBrandAmazon,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://www.amazon.co.jp/s?k=${encodeURIComponent(work.title)}&i=instant-video`
      window.open(url)
    },
  },
  niconico_channel: {
    title: 'ニコニコチャンネル',
    icon: IconMovie,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://ch.nicovideo.jp/search/${encodeURIComponent(work.title)}?type=channel&mode=s`
      window.open(url)
    },
  },
  bandai_channel: {
    title: 'バンダイチャンネル',
    icon: IconMovie,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://www.b-ch.com/search/text/?search_txt=${encodeURIComponent(work.title)}`
      window.open(url)
    },
  },
  youtube: {
    title: 'YouTube',
    icon: IconBrandYoutube,
    isAvailable(): boolean {
      return true
    },
    search: ({ work }) => {
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(work.title)}`
      window.open(url)
    },
  },
}

type SearchIntegration<K extends SearchIntegrationKey> = SearchIntegrationAction<K> & {
  config: SearchIntegrationConfig<K>
}

export type FileSearchButtonProps = {
  entryRef: FileSearchButton_LibraryEntry$key
  configs: EffectiveSearchIntegrationConfigs
}

export function FileSearchButton({ entryRef, configs }: FileSearchButtonProps): ReactNode {
  const entry = useFragment(
    graphql`
      fragment FileSearchButton_LibraryEntry on LibraryEntry {
        work {
          title
        }
        ...useShouldDisableButton_LibraryEntry
      }
    `,
    entryRef,
  )
  const isDisabled = useShouldDisableButton(entry)

  const integrations = useMemo<SearchIntegration<SearchIntegrationKey>[]>(
    () =>
      // eslint-disable-next-line @susisu/safe-typescript/no-unsafe-object-enum-method -- 既知のオブジェクトを enumerate するので問題ない
      Object.values(configs).map((config) => ({
        ...actions[config.key],
        config,
      })),
    [configs],
  )

  // 検索ソースが1つのときはそのまま検索ボタンにする
  if (hasLength(integrations, 1)) {
    const [integration] = integrations

    return (
      <Button
        fullWidth
        disabled={isDisabled}
        leftSection={<IconSearch />}
        mt="md"
        radius="md"
        variant="light"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => {
          integration.search({ work: entry.work, config: integration.config })
        }}
      >
        {integration.title}
      </Button>
    )
  }

  return (
    <Menu withinPortal position="bottom-start" transitionProps={{ transition: 'pop-top-right' }} width={220}>
      <Menu.Target>
        <Button
          fullWidth
          disabled={isDisabled}
          leftSection={<IconSearch />}
          mt="md"
          radius="md"
          rightSection={<IconChevronDown size="1.05rem" stroke={1.5} />}
          variant="light"
        >
          検索
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {integrations
          .filter((integration) => integration.isAvailable({ work: entry.work, config: integration.config }))
          .map((integration) => {
            const { icon: Icon } = integration

            return (
              <Menu.Item
                key={integration.title}
                leftSection={<Icon size="1rem" stroke={1.5} />}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => {
                  integration.search({ work: entry.work, config: integration.config })
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
