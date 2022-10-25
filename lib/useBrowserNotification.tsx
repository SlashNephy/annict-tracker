import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconAlertTriangle } from '@tabler/icons'
import { secondsToMilliseconds } from 'date-fns'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { enableBrowserNotificationState } from './atoms'

import type { SetterOrUpdater } from 'recoil'

export const useBrowserNotification = (): readonly [boolean, SetterOrUpdater<boolean>] => {
  const [enableBrowserNotification, setEnableBrowserNotification] = useRecoilState(enableBrowserNotificationState)

  useEffect(() => {
    if (enableBrowserNotification) {
      switch (Notification.permission) {
        case 'granted':
          showNotification({
            title: 'ブラウザ通知は有効です',
            message: '放送時間が近付いた番組が通知されます。',
            icon: <IconAlertCircle />,
          })
          break
        case 'denied':
          showNotification({
            title: 'ブラウザ通知が許可されていません',
            message: '通知を有効にするには、ブラウザの設定から許可してください。',
            icon: <IconAlertTriangle />,
            color: 'red',
          })
          break
        case 'default':
          Notification.requestPermission()
            .then((permission) => {
              switch (permission) {
                case 'granted': {
                  const item = new Notification('ブラウザ通知が有効になりました', {
                    body: '放送時間が近付いた番組が通知されるようになります。',
                    lang: 'ja',
                    silent: true,
                  })
                  setTimeout(() => {
                    item.close()
                  }, secondsToMilliseconds(10))
                  break
                }
                case 'denied':
                case 'default':
                  showNotification({
                    title: 'ブラウザ通知が拒否されました',
                    message: '通知を有効にするには、ブラウザの設定から許可してください。',
                    icon: <IconAlertTriangle />,
                    color: 'red',
                  })
                  break
              }
            })
            .catch(console.error)
      }
    }
  }, [enableBrowserNotification])

  return [enableBrowserNotification, setEnableBrowserNotification] as const
}
