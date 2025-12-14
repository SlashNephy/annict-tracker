/**
 * @generated SignedSource<<752e4cf0eef1f0cf546673c5c9eb98fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateRecordButton_LibraryEntry$data = {
  readonly id: string;
  readonly nextEpisode: {
    readonly id: string;
    readonly title: string | null | undefined;
  } | null | undefined;
  readonly work: {
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNextEpisodeTitle_LibraryEntry" | "useShouldDisableButton_LibraryEntry">;
  readonly " $fragmentType": "CreateRecordButton_LibraryEntry";
};
export type CreateRecordButton_LibraryEntry$key = {
  readonly " $data"?: CreateRecordButton_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateRecordButton_LibraryEntry">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateRecordButton_LibraryEntry",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Episode",
      "kind": "LinkedField",
      "name": "nextEpisode",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/)
      ],
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
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextEpisodeTitle_LibraryEntry"
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
})();

(node as any).hash = "318b3d0df9003be235237565b32438d1";

export default node;
