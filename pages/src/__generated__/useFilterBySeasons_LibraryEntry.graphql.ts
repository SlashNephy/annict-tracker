/**
 * @generated SignedSource<<42e527aee59b96f35685004c338270ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime'
export type SeasonName = 'AUTUMN' | 'SPRING' | 'SUMMER' | 'WINTER'
import { FragmentRefs } from 'relay-runtime'
export type useFilterBySeasons_LibraryEntry$data = {
  readonly work: {
    readonly seasonName: SeasonName | null
  }
  readonly ' $fragmentType': 'useFilterBySeasons_LibraryEntry'
}
export type useFilterBySeasons_LibraryEntry$key = {
  readonly ' $data'?: useFilterBySeasons_LibraryEntry$data
  readonly ' $fragmentSpreads': FragmentRefs<'useFilterBySeasons_LibraryEntry'>
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: 'Fragment',
  metadata: null,
  name: 'useFilterBySeasons_LibraryEntry',
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

;(node as any).hash = '4fba3b13aefd85bdd6891680d9985645'

export default node
