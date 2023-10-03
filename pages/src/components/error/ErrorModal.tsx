import { Group, Modal, Text, Space, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { captureException } from '@sentry/react'
import { IconMessageReport, IconReload } from '@tabler/icons-react'
import React, { useMemo } from 'react'

import { FeedbackForm } from './FeedbackForm.tsx'
import { RateLimitedError } from '../../lib/errors/RateLimitedError.ts'

export type ErrorModalProps = {
  error: unknown
}

export function ErrorModal({ error }: ErrorModalProps): React.JSX.Element {
  const [isOpened, { close }] = useDisclosure(true)

  const content = useMemo(() => {
    if (!error) {
      return
    }

    if (error instanceof RateLimitedError) {
      return (
        <>
          <Text>Annict API の制限に達しました。しばらく待ってから再度お試しください。</Text>
          <Group justify="center" mt="md">
            <Button
              leftSection={<IconReload />}
              onClick={() => {
                window.location.reload()
              }}
            >
              ページを再読み込み
            </Button>
          </Group>
        </>
      )
    }

    return (
      <>
        <Text>ご不便をおかけしています。この問題は開発者に報告されました。</Text>
        <Text>もしよろしければ、問題が発生したときに行っていた操作をお知らせください。</Text>
        <Text>おなまえとメールアドレスは任意です。個人情報を含めないでください。</Text>

        <Space h="lg" />

        <FeedbackForm
          cancelLabel="報告しない"
          eventId={captureException(error)}
          submitLabel="報告"
          onCancel={() => {
            window.location.reload()
          }}
          onSubmit={() => {
            window.location.reload()
          }}
        />
      </>
    )
  }, [error])

  if (!content) {
    return <></>
  }

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
          <Text>annict-tracker で問題が発生しました。</Text>
        </Group>
      }
      onClose={close}
    >
      {content}
    </Modal>
  )
}
