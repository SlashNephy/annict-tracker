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
        if (!database.objectStoreNames.contains('work-image-cache')) {
          database.createObjectStore('work-image-cache')
        }

        // かつて SWR でキャッシュしていたストアを削除する
        if (database.objectStoreNames.contains('swr-cache')) {
          database.deleteObjectStore('swr-cache')
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
