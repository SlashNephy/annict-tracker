/**
 * @generated SignedSource<<2240c5b746908a4c6e7fd965f27bef39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useShouldDisableButton_LibraryEntry$data = {
  readonly nextEpisode: {
    readonly __typename: "Episode";
  } | null;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextProgram_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "b7e09f10b284820f1636d6c7a2e769b0";

export default node;
