/**
 * @generated SignedSource<<bdede76e3c209b4124a48144bca37286>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkCardImage_LibraryEntry$data = {
  readonly work: {
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useWorkImage_LibraryEntry">;
  readonly " $fragmentType": "WorkCardImage_LibraryEntry";
};
export type WorkCardImage_LibraryEntry$key = {
  readonly " $data"?: WorkCardImage_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorkCardImage_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkCardImage_LibraryEntry",
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
      "name": "useWorkImage_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "fd522d7df1c9c906b4059e3087471397";

export default node;
