import gql from 'graphql-tag'

import type * as Types from './operations'
import type { GraphQLClient } from 'graphql-request'
import type * as Dom from 'graphql-request/dist/types.dom'

export const GetViewerLibraryEntriesDocument = gql`
  query getViewerLibraryEntries($after: String) {
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
export const CreateRecordDocument = gql`
  mutation createRecord($episodeId: ID!) {
    createRecord(input: { episodeId: $episodeId }) {
      clientMutationId
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = async (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    async getViewerLibraryEntries(
      variables?: Types.GetViewerLibraryEntriesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<Types.GetViewerLibraryEntriesQuery> {
      return withWrapper(
        async (wrappedRequestHeaders) =>
          client.request<Types.GetViewerLibraryEntriesQuery>(GetViewerLibraryEntriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getViewerLibraryEntries',
        'query'
      )
    },
    async createRecord(
      variables: Types.CreateRecordMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<Types.CreateRecordMutation> {
      return withWrapper(
        async (wrappedRequestHeaders) =>
          client.request<Types.CreateRecordMutation>(CreateRecordDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createRecord',
        'mutation'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
