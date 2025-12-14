import { useAtomValue } from 'jotai'
import { graphql, useLazyLoadQuery } from 'react-relay'

import { LibraryGrid } from './LibraryGrid.tsx'
import { watchStatusFiltersAtom } from '../../lib/jotai/filters.ts'

import type { ViewerLibrary_Query } from '../../__generated__/ViewerLibrary_Query.graphql.ts'
import type { ReactNode } from 'react'

export function ViewerLibrary(): ReactNode {
  const states = useAtomValue(watchStatusFiltersAtom)
  const { viewer } = useLazyLoadQuery<ViewerLibrary_Query>(
    graphql`
      query ViewerLibrary_Query($states: [StatusState!]!) {
        viewer {
          ...LibraryGrid_User @arguments(states: $states)
        }
      }
    `,
    {
      states,
    },
  )

  if (!viewer) {
    throw new Error('unauthorized')
  }

  return <LibraryGrid viewerRef={viewer} />
}
