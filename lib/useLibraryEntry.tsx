import { useQuery } from '@tanstack/react-query'
import React, { createContext, useContext, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import { LibraryEntryModel } from '../models/LibraryEntryModel'
import {
  dayFiltersState,
  enableSyobocalState,
  isOnlyCurrentSeasonState,
  seasonFiltersState,
  syobocalChannelsState,
  timeFiltersState,
} from './atoms'
import { lookupPrograms } from './services/syobocal'
import { useArmSupplementary } from './useArmSupplementary'
import { useSaya } from './useSaya'

const libraryEntryContext = createContext<LibraryEntryModel | null>(null)

export const LibraryEntryProvider = libraryEntryContext.Provider

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLibraryEntry = () => {
  const entry = useContext(libraryEntryContext)
  if (entry === null) {
    throw new Error('entry is null.')
  }

  const [enableSyobocal] = useRecoilState(enableSyobocalState)
  const [syobocalChannels] = useRecoilState(syobocalChannelsState)
  const arm = useArmSupplementary(enableSyobocal)
  const saya = useSaya(enableSyobocal)

  // しょぼかるの情報から放送時間を補完する
  const {
    data: syobocalPrograms,
    isLoading,
    isError,
  } = useQuery(
    [`syobocal-program-${entry.work.annictId}`, enableSyobocal],
    async () => {
      // Annict 側でチャンネル選択が行われている
      if (entry.nextProgram !== null && entry.nextEpisode !== null) {
        return null
      }

      const workSyobocalTid = arm?.findByAnnictId(entry.work.annictId)?.syobocal_tid ?? entry.work.syobocalTid
      if (entry.nextEpisode === null || workSyobocalTid === null || saya === undefined) {
        return null
      }

      const response = await lookupPrograms([workSyobocalTid])
      return (
        response.ProgLookupResponse?.ProgItems?.ProgItem?.reverse()?.filter(
          (x) => x.Count === entry.nextEpisode?.number
        ) ?? []
      )
    },
    {
      enabled: enableSyobocal && saya !== undefined && arm !== undefined,
    }
  )

  // しょぼかるの放送時間を適応した LibraryEntryModel
  const syobocalEntry = useMemo(() => {
    if (!Array.isArray(syobocalPrograms)) {
      return null
    }

    for (const program of syobocalPrograms) {
      const annictChannel = saya?.findChannelBySyobocalId(program.ChID)
      if (annictChannel?.annictId === undefined) {
        continue
      }

      if (!syobocalChannels.includes(annictChannel.annictId.toString())) {
        continue
      }

      return new LibraryEntryModel({
        ...entry.entity,
        nextProgram: {
          startedAt: program.StTime,
          rebroadcast: syobocalPrograms.filter((x) => x.ChID === annictChannel.annictId).length > 1,
          channel: {
            annictId: annictChannel.annictId,
            name: annictChannel.name,
          },
        },
      })
    }

    return null
  }, [saya, syobocalPrograms, syobocalChannels, entry])

  return {
    entry: syobocalEntry ?? entry,
    isLoading: isLoading && enableSyobocal,
    isError,
  }
}

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
