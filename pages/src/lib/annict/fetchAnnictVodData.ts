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

export async function fetchAnnictVodData(ref = 'master'): Promise<AnnictVodData[]> {
  const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/anime-vod-data/${ref}/dist/data.json`)
  return response.json()
}
