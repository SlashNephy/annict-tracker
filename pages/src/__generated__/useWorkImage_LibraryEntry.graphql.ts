/**
 * @generated SignedSource<<a0a3008fee609258ad7d887bdbd7ceef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useWorkImage_LibraryEntry$data = {
  readonly work: {
    readonly annictId: number;
    readonly id: string;
    readonly image: {
      readonly copyright: string | null;
      readonly recommendedImageUrl: string | null;
    } | null;
    readonly malAnimeId: string | null;
  };
  readonly " $fragmentType": "useWorkImage_LibraryEntry";
};
export type useWorkImage_LibraryEntry$key = {
  readonly " $data"?: useWorkImage_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useWorkImage_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useWorkImage_LibraryEntry",
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "annictId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "WorkImage",
          "kind": "LinkedField",
          "name": "image",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "recommendedImageUrl",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "copyright",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "malAnimeId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "6bbff79bab282e746c1d9aa2aced454b";

export default node;
