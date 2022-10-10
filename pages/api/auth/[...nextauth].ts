import NextAuth from 'next-auth'

import type { OAuthConfig } from 'next-auth/providers'

const annict: OAuthConfig<unknown> = {
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
}

export default NextAuth({
  providers: [annict],
  callbacks: {
    jwt({ token, account }) {
      if (account !== undefined) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    },
  },
})
