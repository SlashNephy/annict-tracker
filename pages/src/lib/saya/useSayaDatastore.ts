import { hoursToMilliseconds } from 'date-fns'
import yaml from 'js-yaml'
import useSWR from 'swr'

import { SayaDatastore } from './SayaDatastore.ts'

import type { SayaDefinition } from './SayaDatastore.ts'

// saya の定義ファイルを読み込む hook
export function useSayaDatastore(enabled = true): SayaDatastore | null {
  const { data } = useSWR(
    'saya',
    async () => {
      if (!enabled) {
        return null
      }

      const data = await fetchSayaDefinition()
      return new SayaDatastore(data)
    },
    {
      suspense: true,
      refetchInterval: hoursToMilliseconds(6),
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
