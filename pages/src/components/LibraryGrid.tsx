import { Grid } from '@mantine/core'
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import { LibraryGridItem } from './LibraryGridItem.tsx'

import type { LibraryGridQuery } from '../__generated__/LibraryGridQuery.graphql.ts'

export function LibraryGrid(): React.JSX.Element {
  // TODO: 60s ごとに refetch
  const { viewer } = useLazyLoadQuery<LibraryGridQuery>(
    graphql`
      query LibraryGridQuery {
        viewer {
          # TODO: ページング
          libraryEntries(states: [WATCHING], after: null) {
            nodes {
              id
              ...LibraryGridItem_LibraryEntry
            }
          }
        }
      }
    `,
    {}
  )

  return (
    <Grid gutter="xl">
      {viewer?.libraryEntries?.nodes
        ?.filter((node): node is NonNullable<typeof node> => node !== null)
        .map((node) => <LibraryGridItem key={node.id} entryRef={node} />)}
    </Grid>
  )
}
