import { Button, Center, Grid, Space } from '@mantine/core'
import { minutesToMilliseconds } from 'date-fns'
import React, { useCallback, useEffect } from 'react'
import { graphql, usePaginationFragment } from 'react-relay'

import { LibraryGridItem } from './LibraryGridItem.tsx'

import type { LibraryGrid_PaginationQuery } from '../../__generated__/LibraryGrid_PaginationQuery.graphql.ts'
import type { LibraryGrid_User$key } from '../../__generated__/LibraryGrid_User.graphql.ts'

export type LibraryGridProps = {
  viewerRef: LibraryGrid_User$key
}

export function LibraryGrid({ viewerRef }: LibraryGridProps): React.JSX.Element {
  const {
    data,
    refetch: _refetch,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment<LibraryGrid_PaginationQuery, LibraryGrid_User$key>(
    graphql`
      fragment LibraryGrid_User on User
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 100 }
        before: { type: "String" }
        after: { type: "String" }
      )
      @refetchable(queryName: "LibraryGrid_PaginationQuery") {
        libraryEntries(states: [WATCHING], first: $first, before: $before, after: $after)
          @connection(key: "LibraryGrid_libraryEntries") {
          edges {
            node {
              id
              ...LibraryGridItem_LibraryEntry
            }
          }
        }
      }
    `,
    viewerRef
  )

  const refetch = useCallback(() => {
    _refetch({}, { fetchPolicy: 'store-and-network' })
  }, [_refetch])

  useEffect(() => {
    // 定期的に再取得
    const interval = window.setInterval(refetch, minutesToMilliseconds(5))

    // ウインドウがアクティブになったときに再取得
    window.addEventListener('focus', refetch)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('focus', refetch)
    }
  }, [refetch])

  return (
    <>
      <Grid gutter="xl">
        {data.libraryEntries?.edges
          ?.map((edge) => edge?.node)
          ?.filter((node): node is NonNullable<typeof node> => node !== null)
          .map((node) => <LibraryGridItem key={node.id} entryRef={node} />)}
      </Grid>

      <Space h="lg" />

      <Center>
        <Button
          disabled={isLoadingNext || !hasNext}
          loading={isLoadingNext}
          onClick={() => {
            loadNext(100)
          }}
        >
          {isLoadingNext ? '読み込み中...' : 'もっと読み込む'}
        </Button>
      </Center>
    </>
  )
}
