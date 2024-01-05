// https://annict.com/db/channels
export const annictChannelIds = {
  bandai_channel: 107,
  niconico_channel: 165,
  d_anime: 241,
  prime_video: 243,
  netflix: 244,
  abema: 260,
  d_anime_niconico: 306,
}

export function isStreamingService(channelId: number): boolean {
  // eslint-disable-next-line @susisu/safe-typescript/no-unsafe-object-enum-method -- 既知のオブジェクトを enumerate するので問題ない
  return Object.values(annictChannelIds).includes(channelId)
}
