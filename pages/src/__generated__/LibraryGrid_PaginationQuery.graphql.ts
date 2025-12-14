/**
 * @generated SignedSource<<0ada745be82066803d68549450e7b632>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatusState = "NO_STATE" | "ON_HOLD" | "STOP_WATCHING" | "WANNA_WATCH" | "WATCHED" | "WATCHING";
export type LibraryGrid_PaginationQuery$variables = {
  after?: string | null | undefined;
  before?: string | null | undefined;
  first?: number | null | undefined;
  id: string;
  states: ReadonlyArray<StatusState>;
};
export type LibraryGrid_PaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"LibraryGrid_User">;
  } | null | undefined;
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
v6 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v7 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v8 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v9 = {
  "kind": "Variable",
  "name": "states",
  "variableName": "states"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "ASC",
      "field": "LAST_TRACKED_AT"
    }
  },
  (v9/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annictId",
  "storageKey": null
},
v14 = {
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
            "args": [
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/)
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
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v12/*: any*/),
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
                          (v11/*: any*/),
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
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  (v11/*: any*/)
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
                              (v11/*: any*/)
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
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "syobocalTid",
                                "storageKey": null
                              },
                              (v11/*: any*/),
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
                              (v14/*: any*/),
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
                                  (v11/*: any*/)
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
                              (v11/*: any*/),
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "numberText",
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v10/*: any*/)
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
                "args": (v12/*: any*/),
                "filters": [
                  "states",
                  "orderBy"
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
    "cacheID": "7c84cdbac2a1774985b45700cc93747b",
    "id": null,
    "metadata": {},
    "name": "LibraryGrid_PaginationQuery",
    "operationKind": "query",
    "text": "query LibraryGrid_PaginationQuery(\n  $after: String\n  $before: String\n  $first: Int = 100\n  $states: [StatusState!]!\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...LibraryGrid_User_uZYUQ\n    id\n  }\n}\n\nfragment CreateRecordButton_LibraryEntry on LibraryEntry {\n  id\n  nextEpisode {\n    id\n    title\n  }\n  work {\n    title\n    id\n  }\n  ...useNextEpisodeTitle_LibraryEntry\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment FileSearchButton_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment LibraryGridItem_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useFilterByCurrentSeason_LibraryEntry\n  ...useFilterBySeasons_LibraryEntry\n  ...useSortNumber_LibraryEntry\n  ...WorkCard_LibraryEntry\n}\n\nfragment LibraryGrid_User_uZYUQ on User {\n  libraryEntries(states: $states, first: $first, before: $before, after: $after, orderBy: {field: LAST_TRACKED_AT, direction: ASC}) {\n    edges {\n      node {\n        id\n        ...LibraryGridItem_LibraryEntry\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment NextEpisodeTitle_LibraryEntry on LibraryEntry {\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment NextProgramInfo_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useWatchProgramSchedule_LibraryEntry\n}\n\nfragment WorkCardImage_LibraryEntry on LibraryEntry {\n  work {\n    title\n    id\n  }\n  ...useWorkImage_LibraryEntry\n}\n\nfragment WorkCardTitle_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n}\n\nfragment WorkCard_LibraryEntry on LibraryEntry {\n  ...WorkCardImage_LibraryEntry\n  ...WorkCardTitle_LibraryEntry\n  ...NextEpisodeTitle_LibraryEntry\n  ...NextProgramInfo_LibraryEntry\n  ...CreateRecordButton_LibraryEntry\n  ...FileSearchButton_LibraryEntry\n}\n\nfragment useFilterByCurrentSeason_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n}\n\nfragment useFilterBySeasons_LibraryEntry on LibraryEntry {\n  work {\n    seasonName\n    id\n  }\n}\n\nfragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    title\n    number\n    numberText\n    id\n  }\n}\n\nfragment useNextProgram_LibraryEntry on LibraryEntry {\n  nextProgram {\n    startedAt\n    channel {\n      annictId\n      name\n      id\n    }\n    rebroadcast\n    id\n  }\n  ...useSyobocalPrograms_LibraryEntry\n}\n\nfragment useShouldDisableButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    __typename\n    id\n  }\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSortNumber_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSyobocalPrograms_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    syobocalTid\n    id\n  }\n  nextEpisode {\n    number\n    id\n  }\n}\n\nfragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {\n  id\n  work {\n    title\n    image {\n      recommendedImageUrl\n      id\n    }\n    id\n  }\n  ...useNextProgram_LibraryEntry\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment useWorkImage_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    image {\n      recommendedImageUrl\n      copyright\n      id\n    }\n    malAnimeId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "dae8d128f6f3dcd5ab2f5a00e0292f7b";

export default node;
