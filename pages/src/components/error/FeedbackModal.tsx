import { Group, Modal, Space, Text } from '@mantine/core'
import { IconMessageReport } from '@tabler/icons-react'
import React from 'react'

import { FeedbackForm } from './FeedbackForm.tsx'

export type FeedbackModalProps = {
  isOpened: boolean
  onClose(): void
}

export function FeedbackModal({ isOpened, onClose }: FeedbackModalProps): React.JSX.Element {
  return (
    <Modal
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={isOpened}
      size="lg"
      title={
        <Group>
          <IconMessageReport />
          <Text>フィードバック</Text>
        </Group>
      }
      onClose={onClose}
    >
      <Text>annict-tracker を改善するため、フィードバックをお寄せください。</Text>
      <Text>頂いたフィードバックは、annict-tracker の開発の参考にさせて頂きます。</Text>
      <Text>おなまえとメールアドレスは任意です。個人情報を含めないでください。</Text>

      <Space h="lg" />

      <FeedbackForm cancelLabel="キャンセル" submitLabel="送信" onCancel={onClose} onSubmit={onClose} />
    </Modal>
  )
}
