import { hoursToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'

import { ArmDatastore } from './ArmDatastore.ts'

import type { ArmEntry } from './ArmDatastore.ts'

export function useArmSupplementaryDatastore(enabled = true): ArmDatastore | null {
  const { data } = useSWRImmutable(enabled ? 'arm-supplementary' : null, fetchArmSupplementary, {
    refreshInterval: hoursToMilliseconds(1),
  })

  return useMemo(() => (data ? new ArmDatastore(data) : null), [data])
}

async function fetchArmSupplementary(): Promise<ArmEntry[]> {
  const response = await fetch('https://raw.githubusercontent.com/SlashNephy/arm-supplementary/master/dist/arm.json')

  return await response.json()
}
