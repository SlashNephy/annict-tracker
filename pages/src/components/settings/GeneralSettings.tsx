import { Group, Stack, Text } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useAtom } from 'jotai'
import React, { useCallback } from 'react'

import { enableBrowserNotificationAtom } from '../../lib/jotai/notification.ts'
import { enableAutoUpdateAtom, enableUpdateCheckAtom } from '../../lib/jotai/update.ts'
import { useRequestNotificationPermission } from '../../lib/notification/useRequestNotificationPermission.tsx'
import { CheckboxWithLabel } from '../common/CheckboxWithLabel.tsx'

export function GeneralSettings(): React.JSX.Element {
  const [enableBrowserNotification, setEnableBrowserNotification] = useAtom(enableBrowserNotificationAtom)
  const [enableUpdateCheck, setEnableUpdateCheck] = useAtom(enableUpdateCheckAtom)
  const [enableAutoUpdate, setEnableAutoUpdate] = useAtom(enableAutoUpdateAtom)

  const requestNotificationPermission = useRequestNotificationPermission()
  const handleToggleEnableBrowserNotification = useCallback(
    (checked: boolean) => {
      setEnableBrowserNotification(checked)
      if (checked) {
        requestNotificationPermission()
      }
    },
    [setEnableBrowserNotification, requestNotificationPermission]
  )

  return (
    <Stack>
      <Group>
        <IconSettings />
        <Text>一般設定</Text>
      </Group>

      <CheckboxWithLabel
        checked={enableBrowserNotification}
        label="放送予定の通知を有効にする"
        description={
          <>
            <Text span>放送時間が近付いたとき (約5分前) に放送予定の通知が表示されます。</Text>
            <Text span>
              この通知は、OS のネイティブの通知を利用するため、通知の利用許可が必要ですが、annict-tracker
              が非アクティブの状態でも通知を受け取ることができます。
            </Text>
          </>
        }
        onToggle={handleToggleEnableBrowserNotification}
      />

      <CheckboxWithLabel
        checked={enableUpdateCheck}
        description="annict-tracker にアップデートがある場合に通知が表示されます。"
        label="定期的にアップデートを確認する"
        onToggle={setEnableUpdateCheck}
      />

      <CheckboxWithLabel
        checked={enableAutoUpdate}
        description="annict-tracker にアップデートがある場合に自動的にリロードします。"
        disabled={!enableUpdateCheck}
        label="自動アップデートを有効にする"
        onToggle={setEnableAutoUpdate}
      />
    </Stack>
  )
}
