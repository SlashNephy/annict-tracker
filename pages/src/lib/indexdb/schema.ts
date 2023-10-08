import type { DBSchema } from 'idb'

export const databaseName = 'annict-tracker'
export const databaseVersion = 1

export type DatabaseSchema = DBSchema & {
  'work-image-cache': {
    key: number
    value: CacheState<{ url: string }>
  }
  'swr-cache': {
    key: string
    value: CacheState<never>
  }
}

export type CacheState<T extends Record<string, unknown>> = T & {
  expiresAt: number
}
