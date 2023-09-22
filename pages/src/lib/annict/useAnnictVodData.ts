import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'

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

export function useAnnictVodData(): AnnictVodData[] | undefined {
  const { data } = useQuery(['vods'], async () => await fetchAnnictVodData(), {
    retry: true,
    retryDelay: minutesToMilliseconds(1),
    refetchInterval: minutesToMilliseconds(15),
  })

  return data
}

async function fetchAnnictVodData(ref = 'master'): Promise<AnnictVodData[]> {
  const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/anime-vod-data/${ref}/dist/data.json`)
  return response.json()
}
