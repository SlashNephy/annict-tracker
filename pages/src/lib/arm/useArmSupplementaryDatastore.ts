import { minutesToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import useSWR from 'swr'

import { ArmDatastore } from './ArmDatastore.ts'

import type { ArmEntry } from './ArmDatastore.ts'

export function useArmSupplementaryDatastore(enabled = true): ArmDatastore | null {
  const { data } = useSWR(
    enabled ? 'arm-supplementary' : null,
    async () => {
      return await fetchArmSupplementary()
    },
    {
      refreshInterval: minutesToMilliseconds(15),
    }
  )

  return useMemo(() => (data ? new ArmDatastore(data) : null), [data])
}

async function fetchArmSupplementary(branch = 'master'): Promise<ArmEntry[]> {
  const response = await fetch(`https://raw.githubusercontent.com/SlashNephy/arm-supplementary/${branch}/dist/arm.json`)
  return await response.json()
}
