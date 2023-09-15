/* eslint-disable */
import * as types from './graphql'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'query getViewerLibraryEntries($after: String) {\n  viewer {\n    libraryEntries(states: [WATCHING], after: $after) {\n      nodes {\n        id\n        work {\n          annictId\n          malAnimeId\n          title\n          viewerStatusState\n          syobocalTid\n          seasonYear\n          seasonName\n          image {\n            recommendedImageUrl\n          }\n        }\n        nextProgram {\n          startedAt\n          rebroadcast\n          channel {\n            annictId\n            name\n          }\n        }\n        nextEpisode {\n          id\n          number\n          numberText\n          title\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}':
    types.GetViewerLibraryEntriesDocument,
  'mutation createRecord($episodeId: ID!) {\n  createRecord(input: {episodeId: $episodeId}) {\n    clientMutationId\n  }\n}':
    types.CreateRecordDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'query getViewerLibraryEntries($after: String) {\n  viewer {\n    libraryEntries(states: [WATCHING], after: $after) {\n      nodes {\n        id\n        work {\n          annictId\n          malAnimeId\n          title\n          viewerStatusState\n          syobocalTid\n          seasonYear\n          seasonName\n          image {\n            recommendedImageUrl\n          }\n        }\n        nextProgram {\n          startedAt\n          rebroadcast\n          channel {\n            annictId\n            name\n          }\n        }\n        nextEpisode {\n          id\n          number\n          numberText\n          title\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}'
): (typeof documents)['query getViewerLibraryEntries($after: String) {\n  viewer {\n    libraryEntries(states: [WATCHING], after: $after) {\n      nodes {\n        id\n        work {\n          annictId\n          malAnimeId\n          title\n          viewerStatusState\n          syobocalTid\n          seasonYear\n          seasonName\n          image {\n            recommendedImageUrl\n          }\n        }\n        nextProgram {\n          startedAt\n          rebroadcast\n          channel {\n            annictId\n            name\n          }\n        }\n        nextEpisode {\n          id\n          number\n          numberText\n          title\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n}']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: 'mutation createRecord($episodeId: ID!) {\n  createRecord(input: {episodeId: $episodeId}) {\n    clientMutationId\n  }\n}'
): (typeof documents)['mutation createRecord($episodeId: ID!) {\n  createRecord(input: {episodeId: $episodeId}) {\n    clientMutationId\n  }\n}']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
