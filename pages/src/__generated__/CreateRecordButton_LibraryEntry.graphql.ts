/**
 * @generated SignedSource<<fbab9b6eddba94f6eef520cad43083ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type CreateRecordButton_LibraryEntry$data = {
  readonly nextEpisode: {
    readonly id: string
    readonly number: number | null
    readonly numberText: string | null
    readonly title: string | null
  } | null
  readonly work: {
    readonly title: string
  }
  readonly ' $fragmentSpreads': FragmentRefs<'useNextEpisodeTitle_LibraryEntry' | 'useShouldDisableButton_LibraryEntry'>
  readonly ' $fragmentType': 'CreateRecordButton_LibraryEntry'
}
export type CreateRecordButton_LibraryEntry$key = {
  readonly ' $data'?: CreateRecordButton_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'CreateRecordButton_LibraryEntry'>
}

const node: ReaderFragment = (function () {
  var v0 = {
    alias: null,
    args: null,
    kind: 'ScalarField',
    name: 'title',
    storageKey: null,
  }
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'CreateRecordButton_LibraryEntry',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'Episode',
        kind: 'LinkedField',
        name: 'nextEpisode',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'id',
            storageKey: null,
          },
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'number',
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'numberText',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Work',
        kind: 'LinkedField',
        name: 'work',
        plural: false,
        selections: [v0 /*: any*/],
        storageKey: null,
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'useNextEpisodeTitle_LibraryEntry',
      },
      {
        args: null,
        kind: 'FragmentSpread',
        name: 'useShouldDisableButton_LibraryEntry',
      },
    ],
    type: 'LibraryEntry',
    abstractKey: null,
  }
})()

;(node as any).hash = 'b2931a20c0813a5c8baede5269dada2c'

export default node
