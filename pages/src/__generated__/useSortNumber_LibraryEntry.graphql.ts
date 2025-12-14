/**
 * @generated SignedSource<<091430df6dbd43d7afb4d1237514daee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type SeasonName = "AUTUMN" | "SPRING" | "SUMMER" | "WINTER";
import { FragmentRefs } from "relay-runtime";
export type useSortNumber_LibraryEntry$data = {
  readonly work: {
    readonly seasonName: SeasonName | null | undefined;
    readonly seasonYear: number | null | undefined;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNextProgram_LibraryEntry">;
  readonly " $fragmentType": "useSortNumber_LibraryEntry";
};
export type useSortNumber_LibraryEntry$key = {
  readonly " $data"?: useSortNumber_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useSortNumber_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useSortNumber_LibraryEntry",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Work",
      "kind": "LinkedField",
      "name": "work",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextProgram_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "55f80cbbf035197ea87df69170dcc831";

export default node;
