import { Anchor, Button, Card, Stack, Text, Title } from '@mantine/core'
import { IconCheck, IconPhotoOff } from '@tabler/icons'
import React from 'react'

import { useLibraryEntry } from '../lib/useLibraryEntry'
import { AnnictCreateRecordButton } from './AnnictCreateRecordButton'
import { WorkImage } from './WorkImage'
import { WorkNextProgramInfo } from './WorkNextProgramInfo'

import type { CardProps } from '@mantine/core'

export const WorkCard: React.FC<Omit<CardProps, 'children'>> = (props) => {
  const { entry } = useLibraryEntry()

  return (
    <Card {...props}>
      <Card.Section>
        <WorkImage height={200} withPlaceholder placeholder={<IconPhotoOff />} entry={entry} title={entry.work.title} />
      </Card.Section>

      <Stack>
        <Title
          order={4}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          mt="sm"
          title={entry.work.title}
        >
          <Anchor href={entry.workUrl} target="_blank">
            {entry.work.title}
          </Anchor>
        </Title>

        <Text
          weight={500}
          style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
          title={entry.nextEpisodeLabel ?? undefined}
        >
          {entry.nextEpisodeLabel}
        </Text>

        <WorkNextProgramInfo />

        <Button.Group>
          <AnnictCreateRecordButton
            leftIcon={<IconCheck />}
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          />
        </Button.Group>
      </Stack>
    </Card>
  )
}
