/**
 * @generated SignedSource<<154a0a35f8f841509389a213f3e41256>>
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

(node as any).hash = "8a231ac7c66fca2a4e28bf2c97157f3a";

export default node;
