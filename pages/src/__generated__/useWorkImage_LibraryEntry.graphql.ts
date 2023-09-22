/**
 * @generated SignedSource<<77e604b69a4a9b77570d6dada5835d3e>>
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

(node as any).hash = "c68e0d3ee27b24cf45f3a0ad6b95b3e0";

export default node;
