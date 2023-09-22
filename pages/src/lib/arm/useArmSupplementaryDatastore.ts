import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'

import { ArmDatastore } from './ArmDatastore.ts'

import type { ArmEntry } from './ArmDatastore.ts'

export function useArmSupplementaryDatastore(enabled?: boolean): ArmDatastore | undefined {
  const { data } = useQuery(
    ['arm-supplementary'],
    async () => {
      const data = await fetchArmSupplementary()
      return new ArmDatastore(data)
    },
    {
      enabled,
      retry: true,
      retryDelay: minutesToMilliseconds(1),
      refetchInterval: minutesToMilliseconds(15),
    }
  )

  return data
}

async function fetchArmSupplementary(branch = 'master'): Promise<ArmEntry[]> {
  const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`)
  return await response.json()
}
