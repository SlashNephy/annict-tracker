/**
 * @generated SignedSource<<c5b67a33d27695b8763ce7e9051b7697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useWorkImage_LibraryEntry$data = {
  readonly work: {
    readonly annictId: number;
    readonly image: {
      readonly copyright: string | null | undefined;
      readonly recommendedImageUrl: string | null | undefined;
    } | null | undefined;
    readonly malAnimeId: string | null | undefined;
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
