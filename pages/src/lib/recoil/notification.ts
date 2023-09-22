import { atom } from 'recoil'

import { persistAtom } from './persist.ts'

export const enableBrowserNotificationState = atom<boolean>({
  key: 'enableBrowserNotification',
  default: false,
  effects: [persistAtom],
})

export const programNotificationThresholdMinutesState = atom<number>({
  key: 'programNotificationThresholdMinutes',
  default: 5,
  effects: [persistAtom],
})

export const notificationHistoriesState = atom<string[]>({
  key: 'notificationHistories',
  default: [],
})
