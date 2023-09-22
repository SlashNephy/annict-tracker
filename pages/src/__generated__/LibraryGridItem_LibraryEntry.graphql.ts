/**
 * @generated SignedSource<<6e77e0fb7498923655584bc5d8b05077>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LibraryGridItem_LibraryEntry$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WorkCard_LibraryEntry" | "useFilterBySeasons_LibraryEntry" | "useIsCurrentSeason_LibraryEntry" | "useNextProgram_LibraryEntry" | "useSortNumber_LibraryEntry">;
  readonly " $fragmentType": "LibraryGridItem_LibraryEntry";
};
export type LibraryGridItem_LibraryEntry$key = {
  readonly " $data"?: LibraryGridItem_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"LibraryGridItem_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LibraryGridItem_LibraryEntry",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextProgram_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useIsCurrentSeason_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useFilterBySeasons_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useSortNumber_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkCard_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "1ab2c830c85c03397ccdfd3dc3f9e18e";

export default node;
