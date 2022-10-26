import type * as Types from './types'

export type GetViewerLibraryEntriesQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetViewerLibraryEntriesQuery = {
  viewer: {
    libraryEntries: {
      nodes:
        | ({
            id: string
            work: {
              annictId: number
              malAnimeId: string | null
              title: string
              viewerStatusState: Types.StatusState | null
              syobocalTid: number | null
              seasonYear: number | null
              seasonName: Types.SeasonName | null
              image: { recommendedImageUrl: string | null } | null
            }
            nextProgram: { startedAt: string; rebroadcast: boolean; channel: { annictId: number; name: string } } | null
            nextEpisode: { id: string; number: number | null; numberText: string | null; title: string | null } | null
          } | null)[]
        | null
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    } | null
  } | null
}

export type CreateRecordMutationVariables = Types.Exact<{
  episodeId: Types.Scalars['ID']
}>

export type CreateRecordMutation = { createRecord: { clientMutationId: string | null } | null }
