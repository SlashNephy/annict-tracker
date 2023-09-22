/**
 * @generated SignedSource<<6f8230a66dbafeafd2f397e51a218344>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type LibraryGridQuery$variables = {}
export type LibraryGridQuery$data = {
  readonly viewer: {
    readonly libraryEntries: {
      readonly nodes: ReadonlyArray<{
        readonly id: string
        readonly ' $fragmentSpreads': FragmentRefs<'LibraryGridItem_LibraryEntry'>
      } | null> | null
    } | null
  } | null
}
export type LibraryGridQuery = {
  response: LibraryGridQuery$data
  variables: LibraryGridQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: 'Literal',
        name: 'states',
        value: ['WATCHING'],
      },
    ],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    },
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'annictId',
      storageKey: null,
    },
    v3 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: 'Fragment',
      metadata: null,
      name: 'LibraryGridQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            {
              alias: null,
              args: v0 /*: any*/,
              concreteType: 'LibraryEntryConnection',
              kind: 'LinkedField',
              name: 'libraryEntries',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'LibraryEntry',
                  kind: 'LinkedField',
                  name: 'nodes',
                  plural: true,
                  selections: [
                    v1 /*: any*/,
                    {
                      args: null,
                      kind: 'FragmentSpread',
                      name: 'LibraryGridItem_LibraryEntry',
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: 'libraryEntries(states:["WATCHING"])',
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Query',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: [],
      kind: 'Operation',
      name: 'LibraryGridQuery',
      selections: [
        {
          alias: null,
          args: null,
          concreteType: 'User',
          kind: 'LinkedField',
          name: 'viewer',
          plural: false,
          selections: [
            {
              alias: null,
              args: v0 /*: any*/,
              concreteType: 'LibraryEntryConnection',
              kind: 'LinkedField',
              name: 'libraryEntries',
              plural: false,
              selections: [
                {
                  alias: null,
                  args: null,
                  concreteType: 'LibraryEntry',
                  kind: 'LinkedField',
                  name: 'nodes',
                  plural: true,
                  selections: [
                    v1 /*: any*/,
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Program',
                      kind: 'LinkedField',
                      name: 'nextProgram',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'startedAt',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          concreteType: 'Channel',
                          kind: 'LinkedField',
                          name: 'channel',
                          plural: false,
                          selections: [
                            v2 /*: any*/,
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'name',
                              storageKey: null,
                            },
                            v1 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'rebroadcast',
                          storageKey: null,
                        },
                        v1 /*: any*/,
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Work',
                      kind: 'LinkedField',
                      name: 'work',
                      plural: false,
                      selections: [
                        v1 /*: any*/,
                        v2 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'syobocalTid',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'seasonYear',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'seasonName',
                          storageKey: null,
                        },
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          concreteType: 'WorkImage',
                          kind: 'LinkedField',
                          name: 'image',
                          plural: false,
                          selections: [
                            {
                              alias: null,
                              args: null,
                              kind: 'ScalarField',
                              name: 'recommendedImageUrl',
                              storageKey: null,
                            },
                            v1 /*: any*/,
                          ],
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'malAnimeId',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                    {
                      alias: null,
                      args: null,
                      concreteType: 'Episode',
                      kind: 'LinkedField',
                      name: 'nextEpisode',
                      plural: false,
                      selections: [
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'number',
                          storageKey: null,
                        },
                        v1 /*: any*/,
                        v3 /*: any*/,
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: 'numberText',
                          storageKey: null,
                        },
                        {
                          alias: null,
                          args: null,
                          kind: 'ScalarField',
                          name: '__typename',
                          storageKey: null,
                        },
                      ],
                      storageKey: null,
                    },
                  ],
                  storageKey: null,
                },
              ],
              storageKey: 'libraryEntries(states:["WATCHING"])',
            },
            v1 /*: any*/,
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: '29a8d0c714ba3c78204bfa44ad2f82e9',
      id: null,
      metadata: {},
      name: 'LibraryGridQuery',
      operationKind: 'query',
      text: 'query LibraryGridQuery {\n  viewer {\n    libraryEntries(states: [WATCHING]) {\n      nodes {\n        id\n        ...LibraryGridItem_LibraryEntry\n      }\n    }\n    id\n  }\n}\n\nfragment CreateRecordButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    id\n    title\n    number\n    numberText\n  }\n  work {\n    title\n    id\n  }\n  ...useNextEpisodeTitle_LibraryEntry\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment FileSearchButton_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment LibraryGridItem_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useIsCurrentSeason_LibraryEntry\n  ...useFilterBySeasons_LibraryEntry\n  ...useSortNumber_LibraryEntry\n  ...WorkCard_LibraryEntry\n}\n\nfragment NextEpisodeTitle_LibraryEntry on LibraryEntry {\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment NextProgramInfo_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useWatchProgramSchedule_LibraryEntry\n}\n\nfragment WorkCardImage_LibraryEntry on LibraryEntry {\n  work {\n    title\n    id\n  }\n  ...useWorkImage_LibraryEntry\n}\n\nfragment WorkCardTitle_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n}\n\nfragment WorkCard_LibraryEntry on LibraryEntry {\n  ...WorkCardImage_LibraryEntry\n  ...WorkCardTitle_LibraryEntry\n  ...NextEpisodeTitle_LibraryEntry\n  ...NextProgramInfo_LibraryEntry\n  ...CreateRecordButton_LibraryEntry\n  ...FileSearchButton_LibraryEntry\n}\n\nfragment useFilterBySeasons_LibraryEntry on LibraryEntry {\n  work {\n    seasonName\n    id\n  }\n}\n\nfragment useIsCurrentSeason_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n}\n\nfragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    title\n    number\n    numberText\n    id\n  }\n}\n\nfragment useNextProgram_LibraryEntry on LibraryEntry {\n  nextProgram {\n    startedAt\n    channel {\n      annictId\n      name\n      id\n    }\n    rebroadcast\n    id\n  }\n  ...useSyobocalPrograms_LibraryEntry\n}\n\nfragment useShouldDisableButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    __typename\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSortNumber_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSyobocalPrograms_LibraryEntry on LibraryEntry {\n  work {\n    id\n    annictId\n    syobocalTid\n  }\n  nextEpisode {\n    number\n    id\n  }\n}\n\nfragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {\n  id\n  work {\n    title\n    image {\n      recommendedImageUrl\n      id\n    }\n    id\n  }\n  ...useNextProgram_LibraryEntry\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment useWorkImage_LibraryEntry on LibraryEntry {\n  work {\n    id\n    annictId\n    image {\n      recommendedImageUrl\n      id\n    }\n    malAnimeId\n  }\n}\n',
    },
  }
})()

;(node as any).hash = 'b5eb82eefe404f4ed4a83bb0c48d9fd8'

export default node
