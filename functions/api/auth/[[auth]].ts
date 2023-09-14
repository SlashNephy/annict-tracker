import { Auth } from '@auth/core'

import type { Env } from '../../env.ts'
import type { JWT } from '@auth/core/jwt'
import type { OAuthConfig } from '@auth/core/providers'
import type { Session } from '@auth/core/types'

export type AuthEnv = {
  AUTH_SECRET: string
  ANNICT_CLIENT_ID: string
  ANNICT_CLIENT_SECRET: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  return await Auth(context.request, {
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
        if (account) {
          ;(token as AnnictJwt).accessToken = account.access_token
        }
        return token
      },
      session({ session, token }) {
        ;(session as AnnictSession).accessToken = (token as AnnictJwt).accessToken
        return session
      },
    },
    debug: context.env.NODE_ENV === 'development',
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

export type AnnictSession = Session & {
  accessToken?: string
}

export type AnnictJwt = JWT & {
  accessToken?: string
}