/**
 * @generated SignedSource<<0253ab0b3059f3d8a921308f30110a4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LibraryGrid_PaginationQuery$variables = {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  id: string;
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "before"
  },
  {
    "defaultValue": 50,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v3 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v4 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "kind": "Literal",
    "name": "states",
    "value": [
      "WATCHING"
    ]
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annictId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LibraryGrid_PaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LibraryGrid_PaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v7/*: any*/),
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
                          (v6/*: any*/),
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
                                  (v8/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
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
                              (v6/*: any*/)
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
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "syobocalTid",
                                "storageKey": null
                              },
                              (v6/*: any*/),
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
                              (v9/*: any*/),
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
                                  (v6/*: any*/)
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
                              (v6/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "numberText",
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
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
                "args": (v7/*: any*/),
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
    "cacheID": "f27b747b8dfb890bf347f4c5478c6abf",
    "id": null,
    "metadata": {},
    "name": "LibraryGrid_PaginationQuery",
    "operationKind": "query",
    "text": "query LibraryGrid_PaginationQuery(\n  $after: String\n  $before: String\n  $first: Int = 50\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...LibraryGrid_User_4uAqg1\n    id\n  }\n}\n\nfragment CreateRecordButton_LibraryEntry on LibraryEntry {\n  id\n  nextEpisode {\n    id\n    title\n    number\n    numberText\n  }\n  work {\n    title\n    id\n  }\n  ...useNextEpisodeTitle_LibraryEntry\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment FileSearchButton_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment LibraryGridItem_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useIsCurrentSeason_LibraryEntry\n  ...useFilterBySeasons_LibraryEntry\n  ...useSortNumber_LibraryEntry\n  ...WorkCard_LibraryEntry\n}\n\nfragment LibraryGrid_User_4uAqg1 on User {\n  libraryEntries(states: [WATCHING], first: $first, before: $before, after: $after) {\n    edges {\n      node {\n        id\n        ...LibraryGridItem_LibraryEntry\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment NextEpisodeTitle_LibraryEntry on LibraryEntry {\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment NextProgramInfo_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useWatchProgramSchedule_LibraryEntry\n}\n\nfragment WorkCardImage_LibraryEntry on LibraryEntry {\n  work {\n    title\n    id\n  }\n  ...useWorkImage_LibraryEntry\n}\n\nfragment WorkCardTitle_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n}\n\nfragment WorkCard_LibraryEntry on LibraryEntry {\n  ...WorkCardImage_LibraryEntry\n  ...WorkCardTitle_LibraryEntry\n  ...NextEpisodeTitle_LibraryEntry\n  ...NextProgramInfo_LibraryEntry\n  ...CreateRecordButton_LibraryEntry\n  ...FileSearchButton_LibraryEntry\n}\n\nfragment useFilterBySeasons_LibraryEntry on LibraryEntry {\n  work {\n    seasonName\n    id\n  }\n}\n\nfragment useIsCurrentSeason_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n}\n\nfragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    title\n    number\n    numberText\n    id\n  }\n}\n\nfragment useNextProgram_LibraryEntry on LibraryEntry {\n  nextProgram {\n    startedAt\n    channel {\n      annictId\n      name\n      id\n    }\n    rebroadcast\n    id\n  }\n  ...useSyobocalPrograms_LibraryEntry\n}\n\nfragment useShouldDisableButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    __typename\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSortNumber_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSyobocalPrograms_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    syobocalTid\n    id\n  }\n  nextEpisode {\n    number\n    id\n  }\n}\n\nfragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {\n  id\n  work {\n    title\n    image {\n      recommendedImageUrl\n      id\n    }\n    id\n  }\n  ...useNextProgram_LibraryEntry\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment useWorkImage_LibraryEntry on LibraryEntry {\n  work {\n    id\n    annictId\n    image {\n      recommendedImageUrl\n      copyright\n      id\n    }\n    malAnimeId\n  }\n}\n"
  }
};
})();

(node as any).hash = "88bf3d4489b8861da89e0dee1f8e9461";

export default node;
