import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import {
  dayFiltersState,
  hideRebroadcastingState,
  hideStreamingServicesState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  timeFiltersState,
} from '../../lib/atoms'
import { useLibraryEntry } from '../../lib/useLibraryEntry'

export const LibraryEntryFilter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { entry } = useLibraryEntry()
  const isOnlyCurrentSeason = useRecoilValue(isOnlyCurrentSeasonState)
  const hideRebroadcasting = useRecoilValue(hideRebroadcastingState)
  const hideStreamingServices = useRecoilValue(hideStreamingServicesState)
  const seasonFilters = useRecoilValue(seasonFiltersState)
  const timeFilters = useRecoilValue(timeFiltersState)
  const dayFilters = useRecoilValue(dayFiltersState)

  const shouldRender = useMemo(() => {
    return (
      entry.filterBySeasonName(seasonFilters) &&
      entry.filterByCurrentSeason(isOnlyCurrentSeason) &&
      entry.filterByRebroadcasting(hideRebroadcasting) &&
      entry.filterByStreamingServices(hideStreamingServices) &&
      entry.filterByTime(timeFilters) &&
      entry.filterByDay(dayFilters, timeFilters)
    )
  }, [entry, seasonFilters, isOnlyCurrentSeason, hideRebroadcasting, hideStreamingServices, timeFilters, dayFilters])

  if (shouldRender) {
    return <>{children}</>
  }

  return null
}
