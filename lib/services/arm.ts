import { arm } from '@kawaiioverflow/arm'

export const convertIntoAnnictId = (syobocalId: number): number | undefined => {
  return arm.find((arm) => arm.syobocal_tid === syobocalId)?.annict_id
}
