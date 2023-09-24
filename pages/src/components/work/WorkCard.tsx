import { Button, Card, Stack } from '@mantine/core'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import { CreateRecordButton } from './buttons/CreateRecordButton.tsx'
import { FileSearchButton } from './buttons/FileSearchButton.tsx'
import { useIntegrationConfigs } from './buttons/useIntegrationConfigs.ts'
import { NextEpisodeTitle } from './NextEpisodeTitle.tsx'
import { NextProgramInfo } from './NextProgramInfo.tsx'
import { WorkCardImage } from './WorkCardImage.tsx'
import { WorkCardTitle } from './WorkCardTitle.tsx'
import { SWRCacheProvider } from '../../lib/swr/SWRCacheProvider.tsx'

import type { WorkCard_LibraryEntry$key } from '../../__generated__/WorkCard_LibraryEntry.graphql.ts'

export type WorkCardProps = {
  entryRef: WorkCard_LibraryEntry$key
}

export function WorkCard({ entryRef }: WorkCardProps): React.JSX.Element {
  const entry = useFragment(
    graphql`
      fragment WorkCard_LibraryEntry on LibraryEntry {
        ...WorkCardImage_LibraryEntry
        ...WorkCardTitle_LibraryEntry
        ...NextEpisodeTitle_LibraryEntry
        ...NextProgramInfo_LibraryEntry
        ...CreateRecordButton_LibraryEntry
        ...FileSearchButton_LibraryEntry
      }
    `,
    entryRef
  )
  const configs = useIntegrationConfigs()

  return (
    <Card withBorder p="lg" radius="md" shadow="sm">
      <Card.Section>
        <SWRCacheProvider>
          <WorkCardImage entryRef={entry} />
        </SWRCacheProvider>
      </Card.Section>

      <Stack>
        <WorkCardTitle entryRef={entry} />
        <NextEpisodeTitle entryRef={entry} />
        <NextProgramInfo entryRef={entry} />
        <Button.Group>
          <CreateRecordButton entryRef={entry} />
          {Object.keys(configs).length > 0 && <FileSearchButton configs={configs} entryRef={entry} />}
        </Button.Group>
      </Stack>
    </Card>
  )
}
