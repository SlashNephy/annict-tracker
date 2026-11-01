/**
 * @generated SignedSource<<2530f48d9c829236985e4c17d32d8f19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FileSearchButton_LibraryEntry$data = {
  readonly work: {
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useShouldDisableButton_LibraryEntry">;
  readonly " $fragmentType": "FileSearchButton_LibraryEntry";
};
export type FileSearchButton_LibraryEntry$key = {
  readonly " $data"?: FileSearchButton_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"FileSearchButton_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FileSearchButton_LibraryEntry",
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
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useShouldDisableButton_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "454df5f715303aeee14febe2fec695c9";

export default node;
