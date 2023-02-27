import { useQuery } from '@tanstack/react-query'
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns'

import { fetchSayaRemoteDatabase } from './services/saya'

import type { SayaDatabase } from './services/saya'

// saya の定義ファイル
export const useSaya = (isEnabled: boolean): SayaDatabase | undefined => {
  const { data } = useQuery(['saya'], async () => fetchSayaRemoteDatabase(), {
    enabled: isEnabled,
    retry: true,
    retryDelay: minutesToMilliseconds(1),
    refetchInterval: hoursToMilliseconds(1),
  })

  return data
}
