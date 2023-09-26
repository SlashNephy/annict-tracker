import { graphql, useFragment } from 'react-relay'

import { getSeasonOf } from '../../../lib/annict/getSeasonOf.ts'
import { useNextProgram } from '../../../lib/annict/useNextProgram.ts'

import type { useShouldDisableButton_LibraryEntry$key } from '../../../__generated__/useShouldDisableButton_LibraryEntry.graphql.ts'
import type { SeasonName } from '../../../lib/annict/getSeasonOf.ts'

export function useShouldDisableButton(entryRef: useShouldDisableButton_LibraryEntry$key): boolean {
  const entry = useFragment(
    graphql`
      fragment useShouldDisableButton_LibraryEntry on LibraryEntry {
        nextEpisode {
          __typename
        }
        work {
          seasonYear
          seasonName
        }
        ...useNextProgram_LibraryEntry
      }
    `,
    entryRef
  )
  const {
    nextEpisode,
    work: { seasonYear, seasonName },
  } = entry
  const nextProgram = useNextProgram(entry)

  /**
   * 以下の条件下ではボタンを無効化する
   * - 次話のエピソード情報がないとき
   * - 次話の放送情報が確定していて、まだ放送されていないとき
   * - 放送シーズンが確定していて、次シーズン以降に放送されるとき
   */
  if (!nextEpisode) {
    return true
  }

  if (nextProgram) {
    return new Date() < nextProgram.startAt
  }

  if (seasonYear && seasonName && isAfterThanCurrentSeason(seasonYear, seasonName)) {
    return true
  }

  return false
}

function isAfterThanCurrentSeason(seasonYear: number, seasonName: SeasonName): boolean {
  const now = new Date()
  const currentSeason = getSeasonOf(now)

  // シーズン年 === 現シーズン年
  if (currentSeason.year === seasonYear) {
    // 1年の中でシーズン名は WINTER, SPRING, SUMMER, AUTUMN の順に並んでいる
    const seasons: SeasonName[] = ['WINTER', 'SPRING', 'SUMMER', 'AUTUMN']

    return seasons.indexOf(currentSeason.name) < seasons.indexOf(seasonName)
  }

  // 現シーズン年 < シーズン年
  return currentSeason.year < seasonYear
}
