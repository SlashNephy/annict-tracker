/**
 * @generated SignedSource<<d9e49f7215ab2af678e4cc066d468351>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useWatchProgramSchedule_LibraryEntry$data = {
  readonly id: string;
  readonly work: {
    readonly image: {
      readonly recommendedImageUrl: string | null | undefined;
    } | null | undefined;
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNextEpisodeTitle_LibraryEntry" | "useNextProgram_LibraryEntry">;
  readonly " $fragmentType": "useWatchProgramSchedule_LibraryEntry";
};
export type useWatchProgramSchedule_LibraryEntry$key = {
  readonly " $data"?: useWatchProgramSchedule_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useWatchProgramSchedule_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useWatchProgramSchedule_LibraryEntry",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextProgram_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextEpisodeTitle_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "2bb3f6f0f0f25979518b742f98bda821";

export default node;
