import React, { useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { dayFiltersState, isOnlyCurrentSeasonState, seasonFiltersState, timeFiltersState } from '../lib/atoms'
import { useLibraryEntry } from '../lib/useLibraryEntry'

export const LibraryEntryFilter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { entry } = useLibraryEntry()
  const [isOnlyCurrentSeason] = useRecoilState(isOnlyCurrentSeasonState)
  const [seasonFilters] = useRecoilState(seasonFiltersState)
  const [timeFilters] = useRecoilState(timeFiltersState)
  const [dayFilters] = useRecoilState(dayFiltersState)

  const shouldRender = useMemo(() => {
    return (
      entry.filterBySeasonName(seasonFilters) &&
      entry.filterByCurrentSeason(isOnlyCurrentSeason) &&
      entry.filterByTime(timeFilters) &&
      entry.filterByDay(dayFilters, timeFilters)
    )
  }, [entry, seasonFilters, isOnlyCurrentSeason, timeFilters, dayFilters])

  if (shouldRender) {
    return <>{children}</>
  }

  return null
}
