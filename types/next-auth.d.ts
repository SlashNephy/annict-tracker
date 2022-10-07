import 'next-auth'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions,@typescript-eslint/naming-convention
  interface JWT {
    accessToken?: string
  }
}
