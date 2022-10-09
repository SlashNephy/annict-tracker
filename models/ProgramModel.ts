import { add, endOfDay, startOfToday, startOfYesterday } from 'date-fns'

import type { ViewerProgram, WorkEpisode } from '../lib/services/annict'
import type { DayFilter, TimeFilter } from './filters'

export type ProgramModel = Omit<ViewerProgram, 'startedAt' | 'episode'> & {
  /**
   * 放送時間を Date にパースしておく
   */
  startAt: Date
  /**
   * 放送日の曜日 (e.g. 月)
   */
  startAtDay: string
  filters: {
    /**
     * 放送時間を分類しておく
     */
    time: TimeFilter
    /**
     * 放送日を分類しておく
     */
    day: DayFilter
  }
  episode: EpisodeModel
  /**
   * 画像 URL
   */
  imageUrl: string | null
  /**
   * 作品 URL
   */
  workUrl: string
  /**
   * 未視聴のエピソード
   */
  remainingEpisodes: EpisodeModel[]
}

export type EpisodeModel = WorkEpisode & {
  label: string | null
}

export const intoProgramModel = (program: ViewerProgram): ProgramModel => {
  const startAt = new Date(program.startedAt)

  return {
    ...program,
    startAt,
    startAtDay: formatDay(startAt),
    filters: {
      time: calculateTimeFilter(startAt),
      day: calculateDayFilter(startAt),
    },
    episode: {
      ...program.episode,
      label: formatEpisodeLabel(program.episode),
    },
    imageUrl: formatImageUrl(program),
    workUrl: `https://annict.com/works/${program.work.annictId}`,
    remainingEpisodes: calculateRemainingEpisodes(program),
  }
}

// https://github.com/kiraka/annict-web/blob/853819f59a8adb1c0f41df19cbe3bf651d765fee/app/models/tv_time.rb
const calculateTimeFilter = (time: Date): TimeFilter => {
  const now = new Date()
  const beginningOfToday = now.getHours() <= 4 ? startOfYesterday() : startOfToday()

  if (
    add(beginningOfToday, { days: -1, hours: 5 }) < time &&
    time < add(endOfDay(beginningOfToday), { days: -1, hours: 5 })
  ) {
    return 'yesterday'
  }

  if (add(beginningOfToday, { hours: 5 }) < time && time < add(endOfDay(beginningOfToday), { hours: 5 })) {
    return 'today'
  }

  if (
    add(beginningOfToday, { days: 1, hours: 5 }) < time &&
    time < add(endOfDay(beginningOfToday), { days: 1, hours: 5 })
  ) {
    return 'tomorrow'
  }

  if (time < add(beginningOfToday, { days: -1, hours: 5 })) {
    return 'finished'
  }

  return 'future'
}

const calculateDayFilter = (time: Date): DayFilter => {
  switch (time.getDay()) {
    case 0:
      return 'sunday'
    case 1:
      return 'monday'
    case 2:
      return 'tuesday'
    case 3:
      return 'wednesday'
    case 4:
      return 'thursday'
    case 5:
      return 'friday'
    default:
      return 'saturday'
  }
}

const formatEpisodeLabel = (episode: WorkEpisode): string | null => {
  if (episode.numberText === null && episode.number === null) {
    return null
  }

  const number = episode.numberText ?? `#${episode.number}`
  return episode.title !== null && episode.title !== '' ? `${number}「${episode.title}」` : number
}

const formatDay = (time: Date): string => {
  switch (time.getDay()) {
    case 0:
      return '日'
    case 1:
      return '月'
    case 2:
      return '火'
    case 3:
      return '水'
    case 4:
      return '木'
    case 5:
      return '金'
    default:
      return '土'
  }
}

const formatImageUrl = (program: ViewerProgram): string | null => {
  const url = program.work.image?.recommendedImageUrl
  if (typeof url !== 'string' || url === '') {
    return null
  }

  // noinspection HttpUrlsUsage
  return url.replace('http://', 'https://')
}

const calculateRemainingEpisodes = (program: ViewerProgram): EpisodeModel[] => {
  const currentEpisodeNumber = program.episode.number
  if (currentEpisodeNumber === null) {
    return []
  }

  return (
    program.work.episodes?.nodes
      ?.filter((e): e is NonNullable<typeof e> => e !== null)
      ?.filter((e) => e.number !== null && currentEpisodeNumber <= e.number)
      ?.sort((a, b) => a.sortNumber - b.sortNumber)
      ?.map((e) => ({
        ...e,
        label: formatEpisodeLabel(e),
      })) ?? []
  )
}
