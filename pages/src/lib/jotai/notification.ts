import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const enableBrowserNotificationAtom = atomWithStorage('enableBrowserNotification', false)

export const programNotificationThresholdMinutesAtom = atomWithStorage('programNotificationThresholdMinutes', 5)

export const notificationHistoriesAtom = atom<string[]>([])
