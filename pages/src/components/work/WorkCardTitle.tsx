import { Anchor, Title } from '@mantine/core'
import React from 'react'
import { graphql, useFragment } from 'react-relay'

import type { WorkCardTitle_LibraryEntry$key } from '../../__generated__/WorkCardTitle_LibraryEntry.graphql.ts'

export type WorkCardTitleProps = {
  entryRef: WorkCardTitle_LibraryEntry$key
}

export function WorkCardTitle({ entryRef }: WorkCardTitleProps): React.JSX.Element {
  const { work } = useFragment(
    graphql`
      fragment WorkCardTitle_LibraryEntry on LibraryEntry {
        work {
          title
          annictId
        }
      }
    `,
    entryRef
  )

  return (
    <Anchor c="blue.4" href={`https://annict.com/works/${work.annictId}`} target="_blank">
      <Title
        c="blue.4"
        fw={600}
        mt="sm"
        order={4}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
        title={work.title}
      >
        {work.title}
      </Title>
    </Anchor>
  )
}
