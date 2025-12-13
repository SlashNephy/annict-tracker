/**
 * @generated SignedSource<<d4e246a8815387a2eabac6387e2e6a98>>
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
    readonly annictId: number;
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "annictId",
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

(node as any).hash = "c105bd07606685545e23b7a654f4864e";

export default node;
