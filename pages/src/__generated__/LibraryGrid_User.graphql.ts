/**
 * @generated SignedSource<<1f8b9502e2b263d4b49ed46b1e3aaf3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime'
import { FragmentRefs } from 'relay-runtime'
export type LibraryGrid_User$data = {
  readonly id: string
  readonly libraryEntries: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string
        readonly ' $fragmentSpreads': FragmentRefs<'LibraryGridItem_LibraryEntry'>
      } | null
    } | null> | null
  } | null
  readonly ' $fragmentType': 'LibraryGrid_User'
}
export type LibraryGrid_User$key = {
  readonly ' $data'?: LibraryGrid_User$data
  readonly ' $fragmentSpreads': FragmentRefs<'LibraryGrid_User'>
}

import LibraryGrid_PaginationQuery_graphql from './LibraryGrid_PaginationQuery.graphql'

const node: ReaderFragment = (function () {
  var v0 = ['libraryEntries'],
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'id',
      storageKey: null,
    }
  return {
    argumentDefinitions: [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'after',
      },
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'before',
      },
      {
        defaultValue: 50,
        kind: 'LocalArgument',
        name: 'first',
      },
    ],
    kind: 'Fragment',
    metadata: {
      connection: [
        {
          count: 'first',
          cursor: 'after',
          direction: 'forward',
          path: v0 /*: any*/,
        },
      ],
      refetch: {
        connection: {
          forward: {
            count: 'first',
            cursor: 'after',
          },
          backward: null,
          path: v0 /*: any*/,
        },
        fragmentPathInResult: ['node'],
        operation: LibraryGrid_PaginationQuery_graphql,
        identifierField: 'id',
      },
    },
    name: 'LibraryGrid_User',
    selections: [
      {
        alias: 'libraryEntries',
        args: [
          {
            kind: 'Literal',
            name: 'states',
            value: ['WATCHING'],
          },
        ],
        concreteType: 'LibraryEntryConnection',
        kind: 'LinkedField',
        name: '__LibraryGrid_libraryEntries_connection',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'LibraryEntryEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'LibraryEntry',
                kind: 'LinkedField',
                name: 'node',
                plural: false,
                selections: [
                  v1 /*: any*/,
                  {
                    args: null,
                    kind: 'FragmentSpread',
                    name: 'LibraryGridItem_LibraryEntry',
                  },
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: '__typename',
                    storageKey: null,
                  },
                ],
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'cursor',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
          {
            alias: null,
            args: null,
            concreteType: 'PageInfo',
            kind: 'LinkedField',
            name: 'pageInfo',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'endCursor',
                storageKey: null,
              },
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'hasNextPage',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: '__LibraryGrid_libraryEntries_connection(states:["WATCHING"])',
      },
      v1 /*: any*/,
    ],
    type: 'User',
    abstractKey: null,
  }
})()

;(node as any).hash = '88bf3d4489b8861da89e0dee1f8e9461'

export default node
