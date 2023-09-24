import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'

import { useServerVersion } from './useServerVersion.ts'

export const useCheckUpdate = (): void => {
  const version = useServerVersion()

  // Cloudflare Pages ビルド時に自動的に埋め込まれるコミットハッシュと API で取得できるコミットハッシュを比較して、更新があるかを確認する
  useEffect(() => {
    const commitSha = import.meta.env.VITE_CF_PAGES_COMMIT_SHA
    const branch = import.meta.env.VITE_CF_PAGES_BRANCH
    if (
      !commitSha ||
      !branch ||
      !version ||
      !version.success ||
      version.result.environment === 'development' ||
      version.result.branch !== branch
    ) {
      return
    }

    if (version.result.commit_sha !== commitSha) {
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
