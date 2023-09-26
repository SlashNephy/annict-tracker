import { run } from '../run.ts'

export type Season = {
  year: number
  name: SeasonName
}

export type SeasonName = 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER'

export function getSeasonOf(date: Date): Season {
  const year = date.getFullYear()
  const name = run(() => {
    const month = date.getMonth() + 1
    if (1 <= month && month < 4) {
      return 'WINTER'
    }

    if (4 <= month && month < 7) {
      return 'SPRING'
    }

    if (7 <= month && month < 10) {
      return 'SUMMER'
    }

    return 'AUTUMN'
  })

  return {
    year,
    name,
  }
}
