import { hoursToMilliseconds } from 'date-fns'
import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'

import { ArmDatastore } from './ArmDatastore.ts'

import type { ArmEntry } from './ArmDatastore.ts'

export function useArmDatastore(enabled = true): ArmDatastore | null {
  const { data } = useSWRImmutable(enabled ? 'arm' : null, fetchArm, {
    refreshInterval: hoursToMilliseconds(1),
  })

  return useMemo(() => (data ? new ArmDatastore(data) : null), [data])
}

async function fetchArm(): Promise<ArmEntry[]> {
  const response = await fetch('https://raw.githubusercontent.com/kawaiioverflow/arm/master/arm.json')

  return await response.json()
}
