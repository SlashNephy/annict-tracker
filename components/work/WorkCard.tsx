import { Anchor, Button, Card, Stack, Text, Title } from '@mantine/core'
import { IconCheck, IconPhotoOff, IconSearch } from '@tabler/icons-react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { AnnictCreateRecordButton } from './AnnictCreateRecordButton'
import { EverythingSearchButton } from './EverythingSearchButton'
import { WorkImage } from './WorkImage'
import { WorkNextProgramInfo } from './WorkNextProgramInfo'
import { enableEverythingIntegrationState } from '../../lib/atoms'
import { useLibraryEntry } from '../../lib/useLibraryEntry'

import type { CardProps } from '@mantine/core'

export function WorkCard(props: Omit<CardProps, 'children'>): React.ReactElement {
  const { entry } = useLibraryEntry()
  const enableEverythingIntegration = useRecoilValue(enableEverythingIntegrationState)

  return (
    <Card {...props}>
      <Card.Section>
        <WorkImage withPlaceholder height={200} placeholder={<IconPhotoOff />} title={entry.work.title} />
      </Card.Section>

      <Stack>
        <Title
          color="blue.4"
          mt="sm"
          order={4}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          title={entry.work.title}
        >
          <Anchor color="blue.4" href={entry.workUrl} target="_blank">
            {entry.work.title}
          </Anchor>
        </Title>

        <Text
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          title={entry.nextEpisodeLabel ?? undefined}
          weight={500}
        >
          {entry.nextEpisodeLabel}
        </Text>

        <WorkNextProgramInfo />

        <Button.Group>
          <AnnictCreateRecordButton
            fullWidth
            color="blue"
            leftIcon={<IconCheck />}
            mt="md"
            radius="md"
            variant="light"
          />
          {enableEverythingIntegration && (
            <EverythingSearchButton
              fullWidth
              color="blue"
              leftIcon={<IconSearch />}
              mt="md"
              radius="md"
              variant="light"
            />
          )}
        </Button.Group>
      </Stack>
    </Card>
  )
}
