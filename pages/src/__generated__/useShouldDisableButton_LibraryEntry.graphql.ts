/**
 * @generated SignedSource<<14d439b873cdef9f58a0b04e3c447649>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type SeasonName = "AUTUMN" | "SPRING" | "SUMMER" | "WINTER";
import { FragmentRefs } from "relay-runtime";
export type useShouldDisableButton_LibraryEntry$data = {
  readonly nextEpisode: {
    readonly __typename: "Episode";
  } | null | undefined;
  readonly work: {
    readonly seasonName: SeasonName | null | undefined;
    readonly seasonYear: number | null | undefined;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNextProgram_LibraryEntry">;
  readonly " $fragmentType": "useShouldDisableButton_LibraryEntry";
};
export type useShouldDisableButton_LibraryEntry$key = {
  readonly " $data"?: useShouldDisableButton_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useShouldDisableButton_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useShouldDisableButton_LibraryEntry",
  "selections": [
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
          "name": "__typename",
          "storageKey": null
        }
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

(node as any).hash = "6e6f16ead7838c52911a85886ab8c817";

export default node;
