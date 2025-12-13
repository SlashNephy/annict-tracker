/**
 * @generated SignedSource<<0d153ea55264da599481019c24d3243d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type SeasonName = "AUTUMN" | "SPRING" | "SUMMER" | "WINTER";
import { FragmentRefs } from "relay-runtime";
export type useFilterByCurrentSeason_LibraryEntry$data = {
  readonly work: {
    readonly seasonName: SeasonName | null | undefined;
    readonly seasonYear: number | null | undefined;
  };
  readonly " $fragmentType": "useFilterByCurrentSeason_LibraryEntry";
};
export type useFilterByCurrentSeason_LibraryEntry$key = {
  readonly " $data"?: useFilterByCurrentSeason_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"useFilterByCurrentSeason_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useFilterByCurrentSeason_LibraryEntry",
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
          "name": "seasonYear",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "seasonName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "d72a04c6dc61d25068f309904957882b";

export default node;
