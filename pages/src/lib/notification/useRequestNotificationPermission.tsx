import { showNotification } from '@mantine/notifications'
import { IconAlertTriangle } from '@tabler/icons-react'
import { secondsToMilliseconds } from 'date-fns'
import { useCallback } from 'react'

import { useNotificationPermission } from './useNotificationPermission.ts'

export function useRequestNotificationPermission(): () => void {
  const { requestPermission } = useNotificationPermission()

  return useCallback(() => {
    requestPermission({
      onAlreadyDenied() {
        showNotification({
          title: 'ブラウザ通知が許可されていません',
          message: '通知を有効にするには、ブラウザの設定から許可してください。',
          icon: <IconAlertTriangle />,
          color: 'red',
        })
      },
      onGranted() {
        const item = new Notification('ブラウザ通知が有効になりました', {
          body: '放送時間が近付いた番組が通知されるようになります。',
          lang: 'ja',
          silent: true,
          requireInteraction: true,
        })
        setTimeout(() => {
          item.close()
        }, secondsToMilliseconds(10))
      },
      onDenied() {
        showNotification({
          title: 'ブラウザ通知が拒否されました',
          message: '通知を有効にするには、ブラウザの設定から許可してください。',
          icon: <IconAlertTriangle />,
          color: 'red',
        })
      },
    })
  }, [requestPermission])
}
