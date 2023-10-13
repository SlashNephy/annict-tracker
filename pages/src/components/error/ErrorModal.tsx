import { Group, Modal, Text, Space, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { captureException } from '@sentry/react'
import { IconMessageReport, IconReload } from '@tabler/icons-react'
import React, { useCallback, useMemo } from 'react'

import { FeedbackForm } from './FeedbackForm.tsx'
import { FetchError } from '../../lib/errors/FetchError.ts'
import { HttpError } from '../../lib/errors/HttpError.ts'
import { RateLimitedError } from '../../lib/errors/RateLimitedError.ts'
import { run } from '../../lib/run.ts'

export type ErrorModalProps = {
  error: unknown
}

export function ErrorModal({ error }: ErrorModalProps): React.JSX.Element {
  const [isOpened, { close }] = useDisclosure(true)

  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])
  const content = useMemo(() => {
    if (!error) {
      return
    }

    const message = run(() => {
      switch (error.constructor) {
        case RateLimitedError:
          return 'Annict API の制限に達しました。しばらく待ってから再度お試しください。'
        case HttpError:
          return 'Annict がエラーを返しました。しばらく待ってから再度お試しください。'
        case FetchError:
          return 'データの取得に失敗しました。インターネット接続をご確認ください。'
      }
    })

    if (message) {
      return (
        <>
          <Text>{message}</Text>
          <Group justify="center" mt="md">
            <Button leftSection={<IconReload />} onClick={handleReload}>
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
          onCancel={handleReload}
          onSubmit={handleReload}
        />
      </>
    )
  }, [error, handleReload])

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
