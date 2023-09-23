import { hoursToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import useSWR from 'swr'

import { SayaDatastore } from './SayaDatastore.ts'

import type { SayaDefinition } from './SayaDatastore.ts'

// saya の定義ファイルを読み込む hook
export function useSayaDatastore(enabled = true): SayaDatastore | null {
  const { data } = useSWR(
    enabled ? 'saya' : null,
    async () => {
      return await fetchSayaDefinition()
    },
    {
      refreshInterval: hoursToMilliseconds(6),
    }
  )

  return useMemo(() => (data ? new SayaDatastore(data) : null), [data])
}

async function fetchSayaDefinition(): Promise<SayaDefinition> {
  const response = await fetch('https://raw.githubusercontent.com/SlashNephy/saya-definitions/master/definitions.json')
  return await response.json()
}
