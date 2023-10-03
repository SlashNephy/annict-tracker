// MEMO: 本当は NO_STATE もあるけどライブラリから引くことはないので消してある
export const watchStatuses = ['WATCHING', 'WANNA_WATCH', 'WATCHED', 'ON_HOLD', 'STOP_WATCHING'] as const
export type WatchStatus = (typeof watchStatuses)[number]

export function getWatchStatusLabel(status: WatchStatus): string {
  switch (status) {
    case 'WATCHING':
      return '見てる'
    case 'WANNA_WATCH':
      return '見たい'
    case 'WATCHED':
      return '見た'
    case 'ON_HOLD':
      return '一時中断'
    case 'STOP_WATCHING':
      return '視聴中止'
    default:
      throw new Error(`unknown watch status: ${status}`)
  }
}
