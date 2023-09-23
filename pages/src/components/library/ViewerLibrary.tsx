import React from 'react'
import { graphql, useLazyLoadQuery } from 'react-relay'

import { LibraryGrid } from './LibraryGrid.tsx'

import type { ViewerLibrary_Query } from '../../__generated__/ViewerLibrary_Query.graphql.ts'

export function ViewerLibrary(): React.JSX.Element {
  const { viewer } = useLazyLoadQuery<ViewerLibrary_Query>(
    graphql`
      query ViewerLibrary_Query {
        viewer {
          ...LibraryGrid_User
        }
      }
    `,
    {}
  )

  if (!viewer) {
    throw new Error('unauthorized')
  }

  return <LibraryGrid viewerRef={viewer} />
}
