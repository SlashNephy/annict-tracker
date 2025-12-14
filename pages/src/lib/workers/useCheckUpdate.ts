import { showNotification } from '@mantine/notifications'
import { minutesToMilliseconds } from 'date-fns'
import { useAtomValue } from 'jotai'
import { useEffect, useMemo } from 'react'

import { useServerVersion } from './useServerVersion.ts'
import { enableAutoUpdateAtom, enableUpdateCheckAtom } from '../jotai/update.ts'

export const useCheckUpdate = (): void => {
  const isUpdateCheckEnabled = useAtomValue(enableUpdateCheckAtom)
  const isAutoUpdateEnabled = useAtomValue(enableAutoUpdateAtom)

  const version = useServerVersion(isUpdateCheckEnabled)
  const isUpdateAvailable = useMemo(() => {
    if (!isUpdateCheckEnabled) {
      return false
    }

    // Cloudflare Pages ビルド時に自動的に埋め込まれるコミットハッシュと API で取得できるコミットハッシュを比較して、更新があるかを確認する
    const commitSha = import.meta.env.VITE_CF_PAGES_COMMIT_SHA
    const branch = import.meta.env.VITE_CF_PAGES_BRANCH
    if (
      !commitSha
      || !branch
      || !version
      || !version.success
      || version.result.environment === 'development'
      || version.result.branch !== branch
    ) {
      return false
    }

    return version.result.commit_sha !== commitSha
  }, [isUpdateCheckEnabled, version])

  useEffect(() => {
    if (!isUpdateAvailable) {
      return
    }

    let timeout: number | undefined
    if (isAutoUpdateEnabled) {
      timeout = window.setTimeout(() => {
        window.location.reload()
      }, minutesToMilliseconds(3))
    }

    showNotification({
      id: 'update-checker',
      title: '新しいビルドが公開されています',
      message: '更新するにはページをリロードしてください。\nこの通知をクリックするとリロードできます。',
      autoClose: false,
      onClick: () => {
        window.location.reload()
      },
    })

    return () => {
      if (timeout) {
        window.clearTimeout(timeout)
      }
    }
  }, [isUpdateAvailable])
}
