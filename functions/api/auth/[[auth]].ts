import { Auth } from '@auth/core'

import type { AnnictJwt, AnnictSession } from './[[auth]].types.ts'
import type { Env } from '../../env.ts'
import type { OAuthConfig } from '@auth/core/providers'

// @ts-expect-error 一時的に無視。
// Auth 関数は config に raw が含まれないとき、Promise<Response> を返すはずだが、Promise<ResponseInternal> が返るような型定義になってしまっている
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
          // TODO: アンビエント宣言で型定義をちゃんとする
          // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
          ;(token as AnnictJwt).accessToken = account.access_token
        }

        return token
      },
      session({ session, ...params }) {
        // eslint-disable-next-line @susisu/safe-typescript/no-unsafe-object-property-check -- session.strategy = 'jwt' のとき、params.token は必ず存在する
        if (!('token' in params)) {
          return session
        }

        // TODO: アンビエント宣言で型定義をちゃんとする
        // eslint-disable-next-line @susisu/safe-typescript/no-type-assertion
        ;(session as AnnictSession).accessToken = (params.token as AnnictJwt).accessToken

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
