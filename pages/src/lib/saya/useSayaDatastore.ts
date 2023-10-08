import { hoursToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'

import { SayaDatastore } from './SayaDatastore.ts'

import type { SayaDefinition } from './SayaDatastore.ts'

// saya の定義ファイルを読み込む hook
export function useSayaDatastore(enabled = true): SayaDatastore | null {
  const { data } = useSWRImmutable(enabled ? 'saya' : null, fetchSayaDefinition, {
    refreshInterval: hoursToMilliseconds(24),
  })

  return useMemo(() => (data ? new SayaDatastore(data) : null), [data])
}

async function fetchSayaDefinition(): Promise<SayaDefinition> {
  const response = await fetch('https://raw.githubusercontent.com/SlashNephy/saya-definitions/master/definitions.json')

  return await response.json()
}
