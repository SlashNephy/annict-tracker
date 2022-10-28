import { useQuery } from '@tanstack/react-query'
import { secondsToMilliseconds } from 'date-fns'

import { LibraryEntryModel } from '../models/LibraryEntryModel'
import { useAnnictClient } from './useAnnictClient'

export type LibraryEntriesState = {
  entries: LibraryEntryModel[]
  isLoading: boolean
  isError: boolean
  error: unknown
}

export const useLibraryEntries = (): LibraryEntriesState => {
  const client = useAnnictClient()

  const {
    data: entries,
    isLoading,
    isError,
    error,
  } = useQuery(
    ['entries', client],
    async () => {
      const response = await client.getViewerLibraryEntries()
      return (
        response.viewer?.libraryEntries?.nodes
          ?.filter((n): n is NonNullable<typeof n> => n !== null)
          ?.map((e) => new LibraryEntryModel(e))
          ?.sort((a, b) => a.sort - b.sort) ?? []
      )
    },
    {
      retry: true,
      retryDelay: secondsToMilliseconds(10),
      refetchInterval: secondsToMilliseconds(60),
    }
  )

  return {
    entries: entries ?? [],
    isLoading,
    isError,
    error,
  }
}
