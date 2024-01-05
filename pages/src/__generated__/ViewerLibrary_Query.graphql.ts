/**
 * @generated SignedSource<<9dc36b17b0a73cd67bd8804854a7a6d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StatusState = "NO_STATE" | "ON_HOLD" | "STOP_WATCHING" | "WANNA_WATCH" | "WATCHED" | "WATCHING";
export type ViewerLibrary_Query$variables = {
  states: ReadonlyArray<StatusState>;
};
export type ViewerLibrary_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"LibraryGrid_User">;
  } | null | undefined;
};
export type ViewerLibrary_Query = {
  response: ViewerLibrary_Query$data;
  variables: ViewerLibrary_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "states"
  }
],
v1 = {
  "kind": "Variable",
  "name": "states",
  "variableName": "states"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "ASC",
      "field": "LAST_TRACKED_AT"
    }
  },
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annictId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewerLibrary_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
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
    "name": "ViewerLibrary_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      (v3/*: any*/),
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
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "name",
                                "storageKey": null
                              },
                              (v3/*: any*/)
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
                          (v3/*: any*/)
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
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "syobocalTid",
                            "storageKey": null
                          },
                          (v3/*: any*/),
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
                          (v5/*: any*/),
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
                              (v3/*: any*/)
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
                          (v3/*: any*/),
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "numberText",
                            "storageKey": null
                          },
                          (v6/*: any*/)
                        ],
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
            "args": (v2/*: any*/),
            "filters": [
              "states",
              "orderBy"
            ],
            "handle": "connection",
            "key": "LibraryGrid_libraryEntries",
            "kind": "LinkedHandle",
            "name": "libraryEntries"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5a970c15d95cbdcebe2e6cad0ddd56c9",
    "id": null,
    "metadata": {},
    "name": "ViewerLibrary_Query",
    "operationKind": "query",
    "text": "query ViewerLibrary_Query(\n  $states: [StatusState!]!\n) {\n  viewer {\n    ...LibraryGrid_User_1N2zJZ\n    id\n  }\n}\n\nfragment CreateRecordButton_LibraryEntry on LibraryEntry {\n  id\n  nextEpisode {\n    id\n    title\n  }\n  work {\n    title\n    id\n  }\n  ...useNextEpisodeTitle_LibraryEntry\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment FileSearchButton_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n  ...useShouldDisableButton_LibraryEntry\n}\n\nfragment LibraryGridItem_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useFilterByCurrentSeason_LibraryEntry\n  ...useFilterBySeasons_LibraryEntry\n  ...useSortNumber_LibraryEntry\n  ...WorkCard_LibraryEntry\n}\n\nfragment LibraryGrid_User_1N2zJZ on User {\n  libraryEntries(states: $states, first: 100, orderBy: {field: LAST_TRACKED_AT, direction: ASC}) {\n    edges {\n      node {\n        id\n        ...LibraryGridItem_LibraryEntry\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment NextEpisodeTitle_LibraryEntry on LibraryEntry {\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment NextProgramInfo_LibraryEntry on LibraryEntry {\n  ...useNextProgram_LibraryEntry\n  ...useWatchProgramSchedule_LibraryEntry\n}\n\nfragment WorkCardImage_LibraryEntry on LibraryEntry {\n  work {\n    title\n    id\n  }\n  ...useWorkImage_LibraryEntry\n}\n\nfragment WorkCardTitle_LibraryEntry on LibraryEntry {\n  work {\n    title\n    annictId\n    id\n  }\n}\n\nfragment WorkCard_LibraryEntry on LibraryEntry {\n  ...WorkCardImage_LibraryEntry\n  ...WorkCardTitle_LibraryEntry\n  ...NextEpisodeTitle_LibraryEntry\n  ...NextProgramInfo_LibraryEntry\n  ...CreateRecordButton_LibraryEntry\n  ...FileSearchButton_LibraryEntry\n}\n\nfragment useFilterByCurrentSeason_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n}\n\nfragment useFilterBySeasons_LibraryEntry on LibraryEntry {\n  work {\n    seasonName\n    id\n  }\n}\n\nfragment useNextEpisodeTitle_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    title\n    number\n    numberText\n    id\n  }\n}\n\nfragment useNextProgram_LibraryEntry on LibraryEntry {\n  nextProgram {\n    startedAt\n    channel {\n      annictId\n      name\n      id\n    }\n    rebroadcast\n    id\n  }\n  ...useSyobocalPrograms_LibraryEntry\n}\n\nfragment useShouldDisableButton_LibraryEntry on LibraryEntry {\n  nextEpisode {\n    __typename\n    id\n  }\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSortNumber_LibraryEntry on LibraryEntry {\n  work {\n    seasonYear\n    seasonName\n    id\n  }\n  ...useNextProgram_LibraryEntry\n}\n\nfragment useSyobocalPrograms_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    syobocalTid\n    id\n  }\n  nextEpisode {\n    number\n    id\n  }\n}\n\nfragment useWatchProgramSchedule_LibraryEntry on LibraryEntry {\n  id\n  work {\n    title\n    image {\n      recommendedImageUrl\n      id\n    }\n    id\n  }\n  ...useNextProgram_LibraryEntry\n  ...useNextEpisodeTitle_LibraryEntry\n}\n\nfragment useWorkImage_LibraryEntry on LibraryEntry {\n  work {\n    annictId\n    image {\n      recommendedImageUrl\n      copyright\n      id\n    }\n    malAnimeId\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "60745c852831091b6b08c7d9d84c0120";

export default node;
