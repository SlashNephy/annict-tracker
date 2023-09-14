import { showNotification } from '@mantine/notifications'
import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'
import { useEffect } from 'react'

import type { VersionResponse } from '../../functions/api/version.ts'
import type { UseQueryOptions } from '@tanstack/react-query'

type UseServerVersion = Omit<UseQueryOptions<VersionResponse>, 'queryFn' | 'initialData'>

function useServerVersion(options?: UseServerVersion): VersionResponse | null {
  const { data } = useQuery<VersionResponse>(
    ['version'],
    async () => {
      const response = await fetch('/api/version')
      return await response.json()
    },
    options
  )

  return data ?? null
}

export const useCheckUpdate = (): void => {
  const version = useServerVersion({
    refetchInterval: minutesToMilliseconds(5),
  })

  // Cloudflare Pages ビルド時に自動的に埋め込まれるコミットハッシュと API で取得できるコミットハッシュを比較して、更新があるかを確認する
  useEffect(() => {
    const buildSha = import.meta.env.VITE_CF_PAGES_COMMIT_SHA
    if (!buildSha || !version || version.environment === 'development') {
      return
    }

    if (version.commit_sha !== buildSha) {
      showNotification({
        id: 'update-checker',
        title: '新しいビルドが公開されています',
        message: '更新するにはページをリロードしてください。\nこの通知をクリックするとリロードできます。',
        autoClose: false,
        onClick: () => {
          window.location.reload()
        },
      })
    }
  }, [version])
}
