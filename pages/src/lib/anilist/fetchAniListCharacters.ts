export type AniListCharactersResponse = {
  data: {
    Page: {
      characters: {
        name: {
          native: string
        }
      }[]
    }
  }
}

export async function fetchAniListCharacters(page: number): Promise<AniListCharactersResponse> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          Page(page: ${page}, perPage: 50) {
            characters(sort: FAVOURITES_DESC) {
              name {
                native
              }
            }
          }
        }
      `,
    }),
  })

  return await response.json()
}
