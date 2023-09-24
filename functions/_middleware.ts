import type { Env } from './env.ts'

const productionProtocol = 'https:'
const productionHost = 'annict-tracker.pages.dev'

export const onRequest: PagesFunction<Env> = async (context) => {
  // 本番環境で指定された OAuth 2 クライアントは使用できないため、本番環境にリダイレクトする
  if (context.env.NODE_ENV !== 'development') {
    const url = new URL(context.request.url)
    if (url.protocol !== productionProtocol || url.host !== productionHost) {
      url.protocol = productionProtocol
      url.host = productionHost
      return Response.redirect(url, 301)
    }
  }

  return context.next()
}
