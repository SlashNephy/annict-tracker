/**
 * @generated SignedSource<<4bba750f1af44b1a77ecc9725f7f6222>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NextProgramInfo_LibraryEntry$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useNextProgram_LibraryEntry" | "useWatchProgramSchedule_LibraryEntry">;
  readonly " $fragmentType": "NextProgramInfo_LibraryEntry";
};
export type NextProgramInfo_LibraryEntry$key = {
  readonly " $data"?: NextProgramInfo_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"NextProgramInfo_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NextProgramInfo_LibraryEntry",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNextProgram_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useWatchProgramSchedule_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "2220aae7eb737a54142ade5ebccf249f";

export default node;
