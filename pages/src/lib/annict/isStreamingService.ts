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
  return Object.values(annictChannelIds).includes(channelId)
}
