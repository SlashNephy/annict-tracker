/**
 * @generated SignedSource<<ad6d068f197c8a11918e8f68be984163>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
export type SeasonName = 'AUTUMN' | 'SPRING' | 'SUMMER' | 'WINTER'
import { FragmentRefs } from 'relay-runtime'
export type useIsCurrentSeason_LibraryEntry$data = {
  readonly work: {
    readonly seasonName: SeasonName | null
    readonly seasonYear: number | null
  }
  readonly ' $fragmentType': 'useIsCurrentSeason_LibraryEntry'
}
export type useIsCurrentSeason_LibraryEntry$key = {
  readonly ' $data'?: useIsCurrentSeason_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'useIsCurrentSeason_LibraryEntry'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'useIsCurrentSeason_LibraryEntry',
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
          name: 'seasonYear',
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: 'ScalarField',
          name: 'seasonName',
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: 'LibraryEntry',
  abstractKey: null,
}

;(node as any).hash = '9d03427e273bd0b17b24232e429ab2a7'

export default node
