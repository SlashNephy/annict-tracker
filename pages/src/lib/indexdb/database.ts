import type { DatabaseSchema } from './schema.ts'
import type { StoreNames, StoreValue, StoreKey, IDBPDatabase } from 'idb'

export async function find<S extends StoreNames<DatabaseSchema>>(
  database: IDBPDatabase<DatabaseSchema>,
  storeName: S,
  key: StoreKey<DatabaseSchema, S>,
): Promise<StoreValue<DatabaseSchema, S> | null> {
  const value = await database.get(storeName, key)
  if (!value || value.expiresAt < Date.now()) {
    return null
  }

  return value
}

export async function put<S extends StoreNames<DatabaseSchema>>(
  database: IDBPDatabase<DatabaseSchema>,
  storeName: S,
  key: StoreKey<DatabaseSchema, S>,
  value: Omit<StoreValue<DatabaseSchema, S>, 'expiresAt'>,
  ttl: number,
): Promise<void> {
  await database.put(storeName, { ...value, expiresAt: Date.now() + ttl }, key)
}
