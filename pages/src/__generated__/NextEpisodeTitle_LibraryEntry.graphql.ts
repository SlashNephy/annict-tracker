/**
 * @generated SignedSource<<bf20a5023f25cf38921b32fefbf4c8a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NextEpisodeTitle_LibraryEntry$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useNextEpisodeTitle_LibraryEntry">;
  readonly " $fragmentType": "NextEpisodeTitle_LibraryEntry";
};
export type NextEpisodeTitle_LibraryEntry$key = {
  readonly " $data"?: NextEpisodeTitle_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"NextEpisodeTitle_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NextEpisodeTitle_LibraryEntry",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextEpisodeTitle_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "7228e4969418716e1cd957ca23258029";

export default node;
