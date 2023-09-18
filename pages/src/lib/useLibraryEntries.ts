import { graphql, useLazyLoadQuery } from 'react-relay'

import { LibraryEntryModel } from '../models/LibraryEntryModel.ts'

import type { useLibraryEntries_getViewerQuery } from '../__generated__/useLibraryEntries_getViewerQuery.graphql.ts'

const query = graphql`
  query useLibraryEntries_getViewerQuery($after: String) {
    viewer {
      libraryEntries(states: [WATCHING], after: $after) {
        nodes {
          id
          work {
            annictId
            malAnimeId
            title
            viewerStatusState
            syobocalTid
            seasonYear
            seasonName
            image {
              recommendedImageUrl
            }
          }
          nextProgram {
            startedAt
            rebroadcast
            channel {
              annictId
              name
            }
          }
          nextEpisode {
            id
            number
            numberText
            title
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export const useLibraryEntries = (): LibraryEntryModel[] => {
  // TODO: 60s ごとに refetch
  const data = useLazyLoadQuery<useLibraryEntries_getViewerQuery>(query, {
    after: null,
  })

  return (
    data.viewer?.libraryEntries?.nodes
      ?.filter((n): n is NonNullable<typeof n> => n !== null)
      ?.map((e) => new LibraryEntryModel(e))
      ?.sort((a, b) => a.sort - b.sort) ?? []
  )
}
