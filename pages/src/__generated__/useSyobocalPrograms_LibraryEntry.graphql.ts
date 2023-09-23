/**
 * @generated SignedSource<<b6fd9741f7d065e6279fca880609a597>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type useSyobocalPrograms_LibraryEntry$data = {
  readonly nextEpisode: {
    readonly number: number | null
  } | null
  readonly work: {
    readonly annictId: number
    readonly id: string
    readonly syobocalTid: number | null
  }
  readonly ' $fragmentType': 'useSyobocalPrograms_LibraryEntry'
}
export type useSyobocalPrograms_LibraryEntry$key = {
  readonly ' $data'?: useSyobocalPrograms_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'useSyobocalPrograms_LibraryEntry'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'useSyobocalPrograms_LibraryEntry',
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
          name: 'id',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'annictId',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'syobocalTid',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
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
          name: 'number',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: 'LibraryEntry',
  abstractKey: null,
}

;(node as any).hash = 'c1e3664e39a1844023476177826b7998'

export default node
