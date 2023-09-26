/**
 * @generated SignedSource<<ce436f29f9d58ca4a2710b6b663b02b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LibraryGridItem_LibraryEntry$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WorkCard_LibraryEntry" | "useFilterByCurrentSeason_LibraryEntry" | "useFilterBySeasons_LibraryEntry" | "useNextProgram_LibraryEntry" | "useSortNumber_LibraryEntry">;
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
      "name": "useFilterByCurrentSeason_LibraryEntry"
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

(node as any).hash = "5acbdedb2e2c880b68885757c3235b63";

export default node;
