import { atomWithStorage } from 'jotai/utils'

import type { SearchIntegrationKey } from '../../components/work/buttons/useIntegrationConfigs.ts'

export const searchIntegrationKeysAtom = atomWithStorage<SearchIntegrationKey[]>('searchIntegrationKeys', [])

export const epgStationUrlAtom = atomWithStorage('epgstationUrl', 'http://localhost:8888')
