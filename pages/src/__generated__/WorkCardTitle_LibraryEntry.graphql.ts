/**
 * @generated SignedSource<<926299da6cf15934cf28bf018768cae0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type WorkCardTitle_LibraryEntry$data = {
  readonly work: {
    readonly annictId: number
    readonly title: string
  }
  readonly ' $fragmentType': 'WorkCardTitle_LibraryEntry'
}
export type WorkCardTitle_LibraryEntry$key = {
  readonly ' $data'?: WorkCardTitle_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'WorkCardTitle_LibraryEntry'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'WorkCardTitle_LibraryEntry',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'Work',
      kind: 'LinkedField',
      name: 'work',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'title',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'annictId',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: 'LibraryEntry',
  abstractKey: null,
}

;(node as any).hash = '9b7e71f086bf2429be20139397013482'

export default node
