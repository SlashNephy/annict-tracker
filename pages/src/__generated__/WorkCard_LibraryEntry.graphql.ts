/**
 * @generated SignedSource<<8c3af1bf10f9c58e6bda3867225084a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorkCard_LibraryEntry$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CreateRecordButton_LibraryEntry" | "FileSearchButton_LibraryEntry" | "NextEpisodeTitle_LibraryEntry" | "NextProgramInfo_LibraryEntry" | "WorkCardImage_LibraryEntry" | "WorkCardTitle_LibraryEntry">;
  readonly " $fragmentType": "WorkCard_LibraryEntry";
};
export type WorkCard_LibraryEntry$key = {
  readonly " $data"?: WorkCard_LibraryEntry$data;
  readonly " $fragmentSpreads": FragmentRefs<"WorkCard_LibraryEntry">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkCard_LibraryEntry",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkCardImage_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkCardTitle_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NextEpisodeTitle_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NextProgramInfo_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreateRecordButton_LibraryEntry"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FileSearchButton_LibraryEntry"
    }
  ],
  "type": "LibraryEntry",
  "abstractKey": null
};

(node as any).hash = "896ccdbc2171d14b49f384878324c5e8";

export default node;
