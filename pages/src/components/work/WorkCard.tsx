import { Button, Card, Stack } from '@mantine/core'
import { graphql, useFragment } from 'react-relay'

import { CreateRecordButton } from './buttons/CreateRecordButton.tsx'
import { FileSearchButton } from './buttons/FileSearchButton.tsx'
import { useIntegrationConfigs } from './buttons/useIntegrationConfigs.ts'
import { NextEpisodeTitle } from './NextEpisodeTitle.tsx'
import { NextProgramInfo } from './NextProgramInfo.tsx'
import { WorkCardImage } from './WorkCardImage.tsx'
import { WorkCardTitle } from './WorkCardTitle.tsx'

import type { WorkCard_LibraryEntry$key } from '../../__generated__/WorkCard_LibraryEntry.graphql.ts'
import type { ReactNode } from 'react'

export type WorkCardProps = {
  entryRef: WorkCard_LibraryEntry$key
}

export function WorkCard({ entryRef }: WorkCardProps): ReactNode {
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
    entryRef,
  )
  const configs = useIntegrationConfigs()

  return (
    <Card withBorder p="lg" radius="md" shadow="sm">
      <Card.Section>
        <WorkCardImage entryRef={entry} />
      </Card.Section>

      <Stack>
        <WorkCardTitle entryRef={entry} />
        <NextEpisodeTitle entryRef={entry} />
        <NextProgramInfo entryRef={entry} />
        <Button.Group>
          <CreateRecordButton entryRef={entry} />
          {/* eslint-disable-next-line @susisu/safe-typescript/no-unsafe-object-enum-method -- 既知のオブジェクトを enumerate するので問題ない */}
          {Object.keys(configs).length > 0 && <FileSearchButton configs={configs} entryRef={entry} />}
        </Button.Group>
      </Stack>
    </Card>
  )
}
