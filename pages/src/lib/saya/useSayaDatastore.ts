import { useQuery } from '@tanstack/react-query'
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'
import yaml from 'js-yaml'

import { SayaDatastore } from './SayaDatastore.ts'

import type { SayaDefinition } from './SayaDatastore.ts'

// saya の定義ファイルを読み込む hook
export function useSayaDatastore(enabled?: boolean): SayaDatastore | undefined {
  const { data } = useQuery(
    ['saya'],
    async () => {
      const data = await fetchSayaDefinition()
      return new SayaDatastore(data)
    },
    {
      enabled,
      retry: true,
      retryDelay: minutesToMilliseconds(1),
      refetchInterval: hoursToMilliseconds(1),
    }
  )

  return data
}

// TODO: 定義ファイルを .json にする
async function fetchSayaDefinition(branch = 'master'): Promise<SayaDefinition> {
  const url = `https://raw.githubusercontent.com/SlashNephy/saya-definitions/${branch}/definitions.yml`

  const response = await fetch(url)
  const text = await response.text()
  return yaml.load(text) as SayaDefinition
}
