/**
 * @generated SignedSource<<c45ef732b7f6bd13ec0e44d2ef6a952c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatusState = "NO_STATE" | "ON_HOLD" | "STOP_WATCHING" | "WANNA_WATCH" | "WATCHED" | "WATCHING";
export type LibraryGrid_PaginationQuery$variables = {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  id: string;
  states: ReadonlyArray<StatusState>;
};
export type LibraryGrid_PaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"LibraryGrid_User">;
  } | null;
};
export type LibraryGrid_PaginationQuery = {
  response: LibraryGrid_PaginationQuery$data;
  variables: LibraryGrid_PaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v2 = {
  "defaultValue": 100,
  "kind": "LocalArgument",
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "states"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "states",
    "variableName": "states"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annictId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "LibraryGrid_PaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v6/*: any*/),
            "kind": "FragmentSpread",
            "name": "LibraryGrid_User"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "LibraryGrid_PaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "LibraryEntryConnection",
                "kind": "LinkedField",
                "name": "libraryEntries",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "LibraryEntryEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LibraryEntry",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Program",
                            "kind": "LinkedField",
                            "name": "nextProgram",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "startedAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Channel",
                                "kind": "LinkedField",
                                "name": "channel",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "rebroadcast",
                                "storageKey": null
                              },
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Work",
                            "kind": "LinkedField",
                            "name": "work",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "syobocalTid",
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "seasonYear",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "seasonName",
                                "storageKey": null
                              },
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "WorkImage",
                                "kind": "LinkedField",
                                "name": "image",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "recommendedImageUrl",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "copyright",
                                    "storageKey": null
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "malAnimeId",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Episode",
                            "kind": "LinkedField",
                            "name": "nextEpisode",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "number",
                                "storageKey": null
                              },
                              (v8/*: any*/),
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "numberText",
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": [
                  "states"
                ],
                "handle": "connection",
                "key": "LibraryGrid_libraryEntries",
                "kind": "LinkedHandle",
                "name": "libraryEntries"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f5fe34d34fa1f9dfb074edcd03588843",
    "id": null,
    "metadata": {},
    "name": "LibraryGrid_PaginationQuery",
    "operationKind": "query",
    "text": "query LibraryGrid_PaginationQuery(\n  $after: String\n  $before: String\n  $first: Int = 100\n  $states: [StatusState!]!\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...LibraryGrid_User_uZYUQ\n    id\n  }\n}\n\nfragment CreateRecordButton_LibraryEntry on LibraryEntry {\n  id\n  nextEpisode {\n    id\n    title\n  }\n  work {\n    title\n    id\n  }\n  ...useNextEpisodeTitle_LibraryEntry\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment FileSearchButton_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment LibraryGridItem_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useFilterByCurrentSeason_LibraryEntry\n  ...useFilterBySeasons_LibraryEntry\n  ...useSortNumber_LibraryEntry\n  ...WorkCard_LibraryEntry\n}\n\nfragment LibraryGrid_User_uZYUQ on User {\n  libraryEntries(states: $states, first: $first, before: $before, after: $after) {\n    edges {\n      node {\n        id\n        ...LibraryGridItem_LibraryEntry\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment NextEpisodeTitle_LibraryEntry on LibraryEntry {\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment NextProgramInfo_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useWatchProgramSchedule_LibraryEntry\n}\n\nfragment WorkCardImage_LibraryEntry on LibraryEntry {\n  work {\n    title\n    id\n  }\n  ...useWorkImage_LibraryEntry\n}\n\nfragment WorkCardTitle_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n}\n\nfragment WorkCard_LibraryEntry on LibraryEntry {\n  ...WorkCardImage_LibraryEntry\n  ...WorkCardTitle_LibraryEntry\n  ...NextEpisodeTitle_LibraryEntry\n  ...NextProgramInfo_LibraryEntry\n  ...CreateRecordButton_LibraryEntry\n  ...FileSearchButton_LibraryEntry\n}\n\nfragment useFilterByCurrentSeason_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n}\n\nfragment useFilterBySeasons_LibraryEntry on LibraryEntry {\n  work {\n    seasonName\n    id\n  }\n}\n\nfragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    title\n    number\n    numberText\n    id\n  }\n}\n\nfragment useNextProgram_LibraryEntry on LibraryEntry {\n  nextProgram {\n    startedAt\n    channel {\n      annictId\n      name\n      id\n    }\n    rebroadcast\n    id\n  }\n  ...useSyobocalPrograms_LibraryEntry\n}\n\nfragment useShouldDisableButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    __typename\n    id\n  }\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSortNumber_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSyobocalPrograms_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    syobocalTid\n    id\n  }\n  nextEpisode {\n    number\n    id\n  }\n}\n\nfragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {\n  id\n  work {\n    title\n    image {\n      recommendedImageUrl\n      id\n    }\n    id\n  }\n  ...useNextProgram_LibraryEntry\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment useWorkImage_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    image {\n      recommendedImageUrl\n      copyright\n      id\n    }\n    malAnimeId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "58f87ae70f482278ae8d2449552241d8";

export default node;
