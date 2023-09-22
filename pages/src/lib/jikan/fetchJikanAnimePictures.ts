export type JikanAnimePictures = {
  data: {
    jpg?: {
      image_url?: string
      small_image_url?: string
      large_image_url?: string
    }
    webp?: {
      image_url?: string
      small_image_url?: string
      large_image_url?: string
    }
  }[]
}

export async function fetchJikanAnimePictures(malId: string): Promise<JikanAnimePictures> {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}/pictures`)
  return response.json()
}
