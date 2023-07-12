import NextAuth from 'next-auth'

import type { AnnictProfile } from '../../../lib/services/annict.ts'
import type { OAuthConfig } from 'next-auth/providers'

const annict: OAuthConfig<AnnictProfile> = {
  id: 'annict',
  name: 'Annict',
  type: 'oauth',
  clientId: process.env.ANNICT_CLIENT_ID,
  clientSecret: process.env.ANNICT_CLIENT_SECRET,
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
      email: profile.email,
      image: profile.avatar_url,
    }
  },
}

// TODO: Support Edge Runtime
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes#edge-api-routes
// export const config = { runtime: 'edge' }

export default NextAuth({
  providers: [annict],
  callbacks: {
    jwt({ token, account }) {
      const t = token
      if (account) {
        t.accessToken = account.access_token
      }
      return t
    },
    session({ session, token }) {
      const s = session
      s.accessToken = token.accessToken
      return s
    },
  },
})
