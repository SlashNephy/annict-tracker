import { useQuery } from '@tanstack/react-query'
import { secondsToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { LibraryEntryModel } from '../models/LibraryEntryModel'
import { dayFiltersState, isOnlyCurrentSeasonState, seasonFiltersState, timeFiltersState } from './atoms'
import { useAnnictClient } from './useAnnictClient'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLibraryEntries = () => {
  const client = useAnnictClient()
  const [isOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [seasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters] = useRecoilState(dayFiltersState)

  const { data, isLoading, isError, error } = useQuery(
    ['entries'],
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

  const entries = useMemo<LibraryEntryModel[]>(
    () =>
      data
        ?.filter((e) => e.filterBySeasonName(seasonFilters))
        ?.filter((e) => e.filterByCurrentSeason(isOnlyCurrentSeason))
        ?.filter((e) => e.filterByTime(timeFilters))
        ?.filter((e) => e.filterByDay(dayFilters, timeFilters)) ?? [],
    [data, seasonFilters, isOnlyCurrentSeason, timeFilters, dayFilters]
  )

  return {
    entries,
    isLoading,
    isError,
    error,
  } as const
}
