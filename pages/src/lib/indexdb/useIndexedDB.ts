import { captureException } from '@sentry/react'
import { openDB } from 'idb'
import { useEffect, useState } from 'react'

import { databaseName, databaseVersion } from './schema.ts'

import type { DatabaseSchema } from './schema.ts'
import type { IDBPDatabase } from 'idb'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function useIndexedDB(): IDBPDatabase<DatabaseSchema> | undefined {
  const [value, setValue] = useState<IDBPDatabase<DatabaseSchema>>()
  useEffect(() => {
    let database: IDBPDatabase<DatabaseSchema> | undefined
    void openDB<DatabaseSchema>(databaseName, databaseVersion, {
      upgrade(database) {
        database.createObjectStore('work-image-cache')

        // かつて SWR でキャッシュしていたストアを削除する
        try {
          database.deleteObjectStore('swr-cache')
        } catch (_: unknown) {
          // ignore
        }
      },
    })
      .then((db) => {
        setValue(db)
      })
      .catch(captureException)

    return () => {
      database?.close()
    }
  }, [])

  return value
}
