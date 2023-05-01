import { cached_property } from 'cached_property'
import { add, endOfDay, startOfToday, startOfYesterday } from 'date-fns'

import { SeasonName } from '../graphql/annict/generated/graphql'
import { AnnictSeason, isStreamingService } from '../lib/services/annict'

import type { DayTag, TimeTag } from './filters'
import type { AnnictEpisode, AnnictLibraryEntry, AnnictProgram, AnnictWork } from '../lib/services/annict'

export class LibraryEntryModel {
  public constructor(public readonly entity: AnnictLibraryEntry) {}

  @cached_property
  public get nextProgramStartAt(): Date | null {
    if (this.nextProgram === null) {
      return null
    }

    return new Date(this.nextProgram.startedAt)
  }

  public get id(): string {
    return this.entity.id
  }

  public get work(): AnnictWork {
    return this.entity.work
  }

  public get workUrl(): string {
    return `https://annict.com/works/${this.work.annictId}`
  }

  public get workImageUrl(): string | undefined {
    const url = this.work.image?.recommendedImageUrl
    if (typeof url !== 'string' || url === '') {
      return undefined
    }

    return url
  }

  public get workSeason(): AnnictSeason {
    return new AnnictSeason(this.work.seasonYear, this.work.seasonName)
  }

  public get nextProgram(): AnnictProgram | null {
    return this.entity.nextProgram
  }

  public get nextProgramStartAtDay(): string | null {
    if (this.nextProgramStartAt === null) {
      return null
    }

    return ['日', '月', '火', '水', '木', '金', '土'][this.nextProgramStartAt.getDay()]
  }

  public get nextEpisode(): AnnictEpisode | null {
    return this.entity.nextEpisode
  }

  public get nextEpisodeLabel(): string | null {
    if (typeof this.nextEpisode?.numberText !== 'string' && typeof this.nextEpisode?.number !== 'number') {
      return null
    }

    const number = this.nextEpisode.numberText ?? `#${this.nextEpisode.number}`
    return this.nextEpisode.title !== null && this.nextEpisode.title !== ''
      ? `${number}「${this.nextEpisode.title}」`
      : number
  }

  // https://github.com/kiraka/annict-web/blob/853819f59a8adb1c0f41df19cbe3bf651d765fee/app/models/tv_time.rb
  public get timeTag(): TimeTag {
    if (this.workSeason.year === null || this.workSeason.name === null) {
      return 'undetermined'
    }

    if (this.nextProgramStartAt === null) {
      return this.workSeason.isCurrentSeason ? 'undetermined' : 'unset'
    }

    const now = new Date()
    const beginningOfToday = now.getHours() <= 4 ? startOfYesterday() : startOfToday()

    const inRange = (left: Date, right: Date): boolean =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      left < this.nextProgramStartAt! && this.nextProgramStartAt! < right

    if (
      inRange(add(beginningOfToday, { days: -1, hours: 5 }), add(endOfDay(beginningOfToday), { days: -1, hours: 5 }))
    ) {
      return 'yesterday'
    }

    if (inRange(add(beginningOfToday, { hours: 5 }), add(endOfDay(beginningOfToday), { hours: 5 }))) {
      return 'today'
    }

    if (inRange(add(beginningOfToday, { days: 1, hours: 5 }), add(endOfDay(beginningOfToday), { days: 1, hours: 5 }))) {
      return 'tomorrow'
    }

    if (this.nextProgramStartAt < add(beginningOfToday, { days: -1, hours: 5 })) {
      return 'finished'
    }

    return 'future'
  }

  public get dayTag(): DayTag {
    if (this.nextProgramStartAt === null) {
      return 'unset'
    }

    const tags = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as DayTag[]
    return tags[this.nextProgramStartAt.getDay()]
  }

  public get sort(): number {
    const year = this.workSeason.year ?? 9999

    // シーズン名が未設定の場合は最後の日にする
    if (this.workSeason.name === null) {
      return new Date(year, 12, 31).getTime()
    }

    // 放送予定がない場合はシーズンの最後の日にする
    if (this.nextProgramStartAt === null) {
      const month = { SPRING: 6, SUMMER: 9, AUTUMN: 12, WINTER: 3 }[this.workSeason.name]
      return new Date(year, month, 31).getTime()
    }

    return this.nextProgramStartAt.getTime()
  }

  public filterBySeasonName(filters: SeasonName[]): boolean {
    switch (this.work.seasonName) {
      case SeasonName.Spring:
        return filters.includes(SeasonName.Spring)
      case SeasonName.Summer:
        return filters.includes(SeasonName.Summer)
      case SeasonName.Autumn:
        return filters.includes(SeasonName.Autumn)
      case SeasonName.Winter:
        return filters.includes(SeasonName.Winter)
      default:
        return true
    }
  }

  public filterByCurrentSeason(isOnlyCurrentSeason: boolean): boolean {
    if (!isOnlyCurrentSeason) {
      return true
    }

    return this.workSeason.isCurrentSeason
  }

  public filterByRebroadcasting(hideRebroadcasting: boolean): boolean {
    if (!hideRebroadcasting) {
      return true
    }

    return this.nextProgram?.rebroadcast !== true
  }

  public filterByStreamingServices(hideStreamingServices: boolean): boolean {
    if (!hideStreamingServices) {
      return true
    }

    return !isStreamingService(this.nextProgram?.channel.annictId)
  }

  public filterByTime(filters: TimeTag[]): boolean {
    switch (this.timeTag) {
      case 'yesterday':
        return filters.includes('yesterday')
      case 'today':
        return filters.includes('today')
      case 'tomorrow':
        return filters.includes('tomorrow')
      case 'finished':
        return filters.includes('finished')
      case 'future':
        return filters.includes('future')
      case 'undetermined':
        return filters.includes('undetermined')
      case 'unset':
        return filters.includes('unset')
      default:
        throw new Error('Unexpected value')
    }
  }

  public filterByDay(dayFilters: DayTag[], timeFilters: TimeTag[]): boolean {
    switch (this.dayTag) {
      case 'sunday':
        return dayFilters.includes('sunday')
      case 'monday':
        return dayFilters.includes('monday')
      case 'tuesday':
        return dayFilters.includes('tuesday')
      case 'wednesday':
        return dayFilters.includes('wednesday')
      case 'thursday':
        return dayFilters.includes('thursday')
      case 'friday':
        return dayFilters.includes('friday')
      case 'saturday':
        return dayFilters.includes('saturday')
      case 'unset':
        return timeFilters.includes('undetermined') || timeFilters.includes('unset')
      default:
        throw new Error('Unexpected value')
    }
  }
}
