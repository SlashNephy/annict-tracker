import React, { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import {
  dayFiltersState,
  hideRebroadcastingState,
  hideStreamingServicesState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  timeFiltersState,
} from '../../lib/atoms.ts'
import { useLibraryEntry } from '../../lib/useLibraryEntry.tsx'

export function LibraryEntryFilter({ children }: React.PropsWithChildren): React.JSX.Element {
  const { entry } = useLibraryEntry()
  const isOnlyCurrentSeason = useRecoilValue(isOnlyCurrentSeasonState)
  const hideRebroadcasting = useRecoilValue(hideRebroadcastingState)
  const hideStreamingServices = useRecoilValue(hideStreamingServicesState)
  const seasonFilters = useRecoilValue(seasonFiltersState)
  const timeFilters = useRecoilValue(timeFiltersState)
  const dayFilters = useRecoilValue(dayFiltersState)

  const shouldRender = useMemo(
    () =>
      entry.filterBySeasonName(seasonFilters) &&
      entry.filterByCurrentSeason(isOnlyCurrentSeason) &&
      entry.filterByRebroadcasting(hideRebroadcasting) &&
      entry.filterByStreamingServices(hideStreamingServices) &&
      entry.filterByTime(timeFilters) &&
      entry.filterByDay(dayFilters, timeFilters),
    [entry, seasonFilters, isOnlyCurrentSeason, hideRebroadcasting, hideStreamingServices, timeFilters, dayFilters]
  )

  if (shouldRender) {
    return <>{children}</>
  }

  return <></>
}
