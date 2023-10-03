import { run } from '../run.ts'

export const seasonNames = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'] as const
export type SeasonName = (typeof seasonNames)[number]

export type Season = {
  year: number
  name: SeasonName
}

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

export function getSeasonLabel(season: SeasonName): string {
  switch (season) {
    case 'SPRING':
      return '春'
    case 'SUMMER':
      return '夏'
    case 'AUTUMN':
      return '秋'
    case 'WINTER':
      return '冬'
    default:
      throw new Error(`unknown season: ${season}`)
  }
}
