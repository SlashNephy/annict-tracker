import { add, endOfDay, startOfToday, startOfYesterday } from 'date-fns'

import { AnnictSeason } from '../lib/services/annict'
import { ArmDatabase } from '../lib/services/arm'

import type { AnnictEpisode, AnnictLibraryEntry, AnnictProgram, AnnictWork } from '../lib/services/annict'
import type { DayTag, TimeTag } from './filters'

export class LibraryEntryModel {
  public constructor(public readonly entity: AnnictLibraryEntry) {}

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

    // Mixed contents を回避するため、https:// に置換しておく
    // TODO: アクセスできない画像があるので Image Proxy を経由する
    // noinspection HttpUrlsUsage
    return url.replace('http://', 'https://')
  }

  public get workSeason(): AnnictSeason {
    return new AnnictSeason(this.work.seasonYear, this.work.seasonName)
  }

  public get nextProgram(): AnnictProgram | null {
    if (this.entity.nextProgram !== null) {
      return this.entity.nextProgram
    }

    const tid = ArmDatabase.DEFAULT.findByAnnictId(this.entity.work.annictId)?.syobocal_tid ?? this.work.syobocalTid
    if (tid === null) {
      return null
    }

    return this.entity.nextProgram
  }

  public get nextProgramStartAt(): Date | null {
    if (this.nextProgram === null) {
      return null
    }

    return new Date(this.nextProgram.startedAt)
  }

  public get nextProgramStartAtDay(): string {
    if (this.nextProgramStartAt === null) {
      throw new Error('nextProgramStartAt is null.')
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

    const inRange = (left: Date, right: Date): boolean => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return left < this.nextProgramStartAt! && this.nextProgramStartAt! < right
    }

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
}
