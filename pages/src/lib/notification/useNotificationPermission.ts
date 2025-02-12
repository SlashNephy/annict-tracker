import { captureException } from '@sentry/react'
import { useCallback, useEffect, useState } from 'react'

export type RequestPermissionOptions = {
  onAlreadyGranted?(): void
  onAlreadyDenied?(): void
  onGranted?(): void
  onDenied?(): void
  onUnavailable?(): void
}

export type UseNotificationPermissionReturn = {
  permission: NotificationPermission
  requestPermission(options?: RequestPermissionOptions): void
}

export function useNotificationPermission(): UseNotificationPermissionReturn {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  useEffect(() => {
    if (!window.Notification) {
      return
    }

    setPermission(Notification.permission)
  }, [])

  const requestPermission = useCallback((options?: RequestPermissionOptions) => {
    if (!window.Notification) {
      options?.onUnavailable?.()
      return
    }

    switch (Notification.permission) {
      case 'default':
        Notification.requestPermission()
          .then((permission) => {
            switch (permission) {
              case 'granted': {
                options?.onGranted?.()
                break
              }
              case 'denied':
              case 'default': // default (つまりポップアップが閉じられた場合) でも onDenied を呼ぶ
                options?.onDenied?.()
                break
            }
          })
          .catch(captureException)
        break
      case 'granted':
        options?.onAlreadyGranted?.()
        break
      case 'denied':
        options?.onAlreadyDenied?.()
        break
    }
  }, [])

  return {
    permission,
    requestPermission,
  }
}
