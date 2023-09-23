import { useAtomValue } from 'jotai'

import { hideStreamingServicesState } from '../../recoil/filters.ts'
import { isStreamingService } from '../isStreamingService.ts'
import { useNextProgram } from '../useNextProgram.ts'

import type { useNextProgram_LibraryEntry$key } from '../../../__generated__/useNextProgram_LibraryEntry.graphql.ts'

export function useFilterByStreamingServices(entryRef: useNextProgram_LibraryEntry$key): boolean {
  const nextProgram = useNextProgram(entryRef)
  const hideStreamingServices = useAtomValue(hideStreamingServicesState)
  if (!hideStreamingServices) {
    return true
  }

  const channelId = nextProgram?.channel.annictId
  if (!channelId) {
    return true
  }

  return !isStreamingService(channelId)
}
