import { Anchor, Button, Card, Stack, Text, Title } from '@mantine/core'
import { IconCheck, IconPhotoOff, IconSearch } from '@tabler/icons-react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { AnnictCreateRecordButton } from './AnnictCreateRecordButton.tsx'
import { FileSearchButton } from './FileSearchButton.tsx'
import { WorkImage } from './WorkImage.tsx'
import { WorkNextProgramInfo } from './WorkNextProgramInfo.tsx'
import { effectiveIntegrationConfigsState } from '../../lib/atoms.ts'
import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

import type { CardProps } from '@mantine/core'

export function WorkCard(props: Omit<CardProps, 'children'>): React.ReactElement {
  const { entry } = useLibraryEntry()
  const configs = useRecoilValue(effectiveIntegrationConfigsState)

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
          {Object.keys(configs).length > 0 && (
            <FileSearchButton
              fullWidth
              color="blue"
              configs={configs}
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
