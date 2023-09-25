import { Group, Stack, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import React from 'react'

import { enableBrowserNotificationAtom } from '../../lib/jotai/notification.ts'
import { useRequestNotificationPermission } from '../../lib/notification/useRequestNotificationPermission.tsx'
import { CheckboxWithLabel } from '../common/CheckboxWithLabel.tsx'

export function GeneralSettings(): React.JSX.Element {
  const [enableBrowserNotification, setEnableBrowserNotification] = useAtom(enableBrowserNotificationAtom)
  const requestNotificationPermission = useRequestNotificationPermission()

  return (
    <Stack>
      <Group>
        <IconSettings />
        <Text>一般設定</Text>
      </Group>

      <CheckboxWithLabel
        checked={enableBrowserNotification}
        description="放送時間が近付いたとき (約5分前) に放送予定の通知が表示されます。"
        label="ブラウザの通知を有効にする"
        onChange={(event) => {
          setEnableBrowserNotification(event.target.checked)
          if (event.target.checked) {
            requestNotificationPermission()
          }
        }}
      />
    </Stack>
  )
}
