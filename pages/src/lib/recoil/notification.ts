import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const enableBrowserNotificationState = atomWithStorage('enableBrowserNotification', false)

export const programNotificationThresholdMinutesState = atomWithStorage('programNotificationThresholdMinutes', 5)

export const notificationHistoriesState = atom<string[]>([])
