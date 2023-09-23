/**
 * @generated SignedSource<<ac56d7bdb917d05679d9eec565ae1ef5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type useNextProgram_LibraryEntry$data = {
  readonly nextProgram: {
    readonly channel: {
      readonly annictId: number
      readonly name: string
    }
    readonly rebroadcast: boolean
    readonly startedAt: string
  } | null
  readonly ' $fragmentSpreads': FragmentRefs<'useSyobocalPrograms_LibraryEntry'>
  readonly ' $fragmentType': 'useNextProgram_LibraryEntry'
}
export type useNextProgram_LibraryEntry$key = {
  readonly ' $data'?: useNextProgram_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'useNextProgram_LibraryEntry'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'useNextProgram_LibraryEntry',
  selections: [
    {
      alias: null,
      args: null,
      concreteType: 'Program',
      kind: 'LinkedField',
      name: 'nextProgram',
      plural: false,
      selections: [
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'startedAt',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          concreteType: 'Channel',
          kind: 'LinkedField',
          name: 'channel',
          plural: false,
          selections: [
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
              name: 'name',
              storageKey: null,
            },
          ],
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'rebroadcast',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      args: null,
      kind: 'FragmentSpread',
      name: 'useSyobocalPrograms_LibraryEntry',
    },
  ],
  type: 'LibraryEntry',
  abstractKey: null,
}

;(node as any).hash = '168afda740caa334127c0440dd97c7a1'

export default node
