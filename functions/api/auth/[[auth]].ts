import { Auth } from '@auth/core'

import type { OAuthConfig } from '@auth/core/providers'
import type { Session } from '@auth/core/types'

type Env = {
  AUTH_SECRET: string
  ANNICT_CLIENT_ID: string
  ANNICT_CLIENT_SECRET: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const request = new Request(context.request.url)

  return await Auth(request, {
    providers: [
      {
        id: 'annict',
        name: 'Annict',
        type: 'oauth',
        clientId: context.env.ANNICT_CLIENT_ID,
        clientSecret: context.env.ANNICT_CLIENT_SECRET,
        authorization: {
          url: 'https://api.annict.com/oauth/authorize',
          params: {
            response_type: 'code',
            scope: 'read write',
          },
        },
        token: 'https://api.annict.com/oauth/token',
        userinfo: 'https://api.annict.com/v1/me',
        profile(profile) {
          return {
            id: profile.id.toString(),
            email: profile.email,
            name: profile.name,
            image: profile.avatar_url,
          }
        },
      } satisfies OAuthConfig<AnnictProfile>,
    ],
    secret: context.env.AUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    // TODO: 適切にホストを検証する
    trustHost: true,
    callbacks: {
      jwt({ token, account }) {
        if (account !== null) {
          token.accessToken = account.access_token
        }
        return token
      },
      session({ session, token }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- あとでちゃんと型をつける
        ;(session as any).accessToken = token.accessToken
        return session
      },
    },
  })
}

type AnnictProfile = {
  id: number
  username: string
  name: string
  description: string
  url: string
  avatar_url: string
  background_image_url: string
  records_count: number
  followings_count: number
  followers_count: number
  wanna_watch_count: number
  watching_count: number
  watched_count: number
  on_hold_count: number
  stop_watching_count: number
  created_at: string
  email: string
  notifications_count: number
}

type AnnictSession = Session & {
  accessToken?: string
}
