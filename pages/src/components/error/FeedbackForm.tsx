import { ActionIcon, Button, Group, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm, hasLength, isEmail } from '@mantine/form'
import { captureMessage, captureUserFeedback } from '@sentry/react'
import { IconReload, IconSend } from '@tabler/icons-react'
import React, { useCallback, useEffect } from 'react'

import { useRandomAniListCharacterName } from '../../lib/anilist/useRandomAniListCharacterName.ts'

export type FeedbackFormProps = {
  eventId?: string
  submitLabel: string
  cancelLabel?: string
  onSubmit(): void
  onCancel?(): void
}

export function FeedbackForm({
  eventId,
  submitLabel,
  cancelLabel,
  onSubmit,
  onCancel,
}: FeedbackFormProps): React.JSX.Element {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      comments: '',
    },
    validate: {
      name: hasLength({ min: 0, max: 32 }, '32文字以内で入力してください。'),
      email: (value) => {
        if (!value) {
          return null
        }

        return isEmail('正しいメールアドレスを入力してください。')(value)
      },
      comments: hasLength({ min: 1, max: 1024 }, '1024文字以内で入力してください。'),
    },
  })

  const { characterName, redraw } = useRandomAniListCharacterName()
  useEffect(() => {
    form.setFieldValue('name', characterName ?? '')
  }, [form, characterName])

  const handleSubmit = useCallback(
    (values: typeof form.values) => {
      captureUserFeedback({
        event_id: eventId ?? captureMessage('feedback', 'info'),
        name: values.name,
        email: values.email,
        comments: values.comments,
      })
      onSubmit()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- typeof form で依存関係を増やす必要はない
    [eventId, onSubmit]
  )

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="おなまえ"
          placeholder="シド・カゲノー"
          {...form.getInputProps('name')}
          rightSection={
            <ActionIcon variant="transparent" onClick={redraw}>
              <IconReload />
            </ActionIcon>
          }
        />
        <TextInput label="メールアドレス" placeholder="example@annict.com" {...form.getInputProps('email')} />
        <Textarea autosize required label="コメント" placeholder="..." {...form.getInputProps('comments')} />
      </Stack>

      <Group justify="center" mt="md">
        <Button leftSection={<IconSend />} type="submit">
          {submitLabel}
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}
      </Group>
    </form>
  )
}
