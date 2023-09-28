export type AniListMediaImage = {
  data: {
    Media: {
      coverImage: {
        extraLarge: string
      }
    }
  }
}

export async function fetchAniListImage(id: number): Promise<AniListMediaImage> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          Media(id: ${id}) {
            coverImage {
              extraLarge
            }
          }
        }
      `,
    }),
  })

  return await response.json()
}
