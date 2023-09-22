import type { SayaChannel } from './SayaDatastore.ts'

export function filterSayaChannel(channel: SayaChannel): boolean {
  if (channel.syobocalId === undefined) {
    return false
  }

  // アニメ放送しない局を除く
  switch (channel.type) {
    case 'GR':
      switch (channel.syobocalId) {
        case 158: // 放送大学
          return false
        default:
          return true
      }
    case 'BS':
      switch (channel.syobocalId) {
        case 71: // BS日テレ
        case 18: // BS朝日
        case 16: // BS-TBS
        case 15: // BSテレ東
        case 17: // BSフジ
        case 128: // BS11
        case 129: // BS12
        case 197: // BSアニマックス
        case 76: // WOWOWシネマ
        case 204: // WOWOWプライム
        case 97: // WOWOWライブ
        case 271: // BS松竹東急
        case 272: // BSよしもと
        case 273: // BSJapanext
          return true
        default:
          return false
      }
    case 'CS':
      switch (channel.syobocalId) {
        case 20: // AT-X
        case 21: // アニマックス
        case 22: // キッズステーション
        case 23: // カートゥーンネットワーク
          return true
        default:
          return false
      }
    default:
      return true
  }
}
