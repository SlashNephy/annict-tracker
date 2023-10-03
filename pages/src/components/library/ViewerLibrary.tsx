import { useAtomValue } from 'jotai'
import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import { LibraryGrid } from './LibraryGrid.tsx'
import { stateFiltersAtom } from '../../lib/jotai/filters.ts'

import type { ViewerLibrary_Query } from '../../__generated__/ViewerLibrary_Query.graphql.ts'

export function ViewerLibrary(): React.JSX.Element {
  const states = useAtomValue(stateFiltersAtom)
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
    }
  )

  if (!viewer) {
    throw new Error('unauthorized')
  }

  return <LibraryGrid viewerRef={viewer} />
}
