import { useQuery } from '@tanstack/react-query'
import { minutesToMilliseconds } from 'date-fns'

import { ArmDatabase } from './services/arm.ts'

export const useArmSupplementary = (isEnabled: boolean): ArmDatabase | undefined => {
  const { data } = useQuery(
    ['arm'],
    async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/SlashNephy/arm-supplementary/master/dist/arm.json'
      )
      const entries = await response.json()
      return new ArmDatabase(entries)
    },
    {
      enabled: isEnabled,
      refetchInterval: minutesToMilliseconds(15),
    }
  )

  return data
}
