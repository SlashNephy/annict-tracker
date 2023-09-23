import { minutesToMilliseconds } from 'date-fns'
import useSWR from 'swr'

import { ArmDatastore } from './ArmDatastore.ts'

import type { ArmEntry } from './ArmDatastore.ts'

export function useArmSupplementaryDatastore(enabled = true): ArmDatastore | null {
  const { data } = useSWR(
    'arm-supplementary',
    async () => {
      if (!enabled) {
        return null
      }

      const data = await fetchArmSupplementary()
      return new ArmDatastore(data)
    },
    {
      suspense: true,
      refetchInterval: minutesToMilliseconds(15),
    }
  )

  return data
}

async function fetchArmSupplementary(branch = 'master'): Promise<ArmEntry[]> {
  const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`)
  return await response.json()
}
