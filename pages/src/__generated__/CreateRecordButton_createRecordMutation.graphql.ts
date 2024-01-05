/**
 * @generated SignedSource<<3042b06f6ebac0ed15a98d2c5a79ec99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateRecordButton_createRecordMutation$variables = {
  episodeId: string;
};
export type CreateRecordButton_createRecordMutation$data = {
  readonly createRecord: {
    readonly clientMutationId: string | null | undefined;
  } | null | undefined;
};
export type CreateRecordButton_createRecordMutation = {
  response: CreateRecordButton_createRecordMutation$data;
  variables: CreateRecordButton_createRecordMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "episodeId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "episodeId",
            "variableName": "episodeId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "CreateRecordPayload",
    "kind": "LinkedField",
    "name": "createRecord",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "clientMutationId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateRecordButton_createRecordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateRecordButton_createRecordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0447d7ca09a9aa7ba87e8192d8a10ed6",
    "id": null,
    "metadata": {},
    "name": "CreateRecordButton_createRecordMutation",
    "operationKind": "mutation",
    "text": "mutation CreateRecordButton_createRecordMutation(\n  $episodeId: ID!\n) {\n  createRecord(input: {episodeId: $episodeId}) {\n    clientMutationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e48b3bd5c33119a15c2654ce27241db";

export default node;
