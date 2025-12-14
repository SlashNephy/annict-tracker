/**
 * @generated SignedSource<<9639fe12a9d71bd300ce5d40553956e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useNextEpisodeTitle_LibraryEntry$data = {
  readonly nextEpisode: {
    readonly number: number | null | undefined;
    readonly numberText: string | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useNextEpisodeTitle_LibraryEntry";
};
export type useNextEpisodeTitle_LibraryEntry$key = {
  readonly " $data"?: useNextEpisodeTitle_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNextEpisodeTitle_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useNextEpisodeTitle_LibraryEntry",
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
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "number",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "numberText",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "b19b9d8580e9b37055bd63abf49daea7";

export default node;
