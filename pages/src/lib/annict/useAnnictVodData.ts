import { hoursToMilliseconds } from 'date-fns'
import useSWR from 'swr'

export type AnnictVodData = {
  work_id: number
  program_id: number
  channel_id: number
  channel_name: string
  started_at?: string
  is_rebroadcast: boolean
  vod_code?: string
  vod_title?: string
}

export function useAnnictVodData(enabled = true): AnnictVodData[] {
  const { data } = useSWR(
    'vods',
    async () => {
      if (!enabled) {
        return []
      }

      return await fetchAnnictVodData()
    },
    {
      suspense: true,
      refetchInterval: hoursToMilliseconds(6),
    }
  )

  return data
}

async function fetchAnnictVodData(): Promise<AnnictVodData[]> {
  const response = await fetch('https://raw.githubusercontent.com/SlashNephy/anime-vod-data/master/dist/data.json')
  return response.json()
}
