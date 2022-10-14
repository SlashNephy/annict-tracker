import { add } from 'date-fns'

type CacheItem<T> = {
  expiresAt: Date
  data: T
}

export class MemoryCache<T> {
  readonly #cache = new Map<string, CacheItem<T>>()

  public get(key: string): T | null {
    const c = this.#cache.get(key)
    if (c === undefined) {
      return null
    }

    const { expiresAt, data } = c
    const now = new Date()
    if (expiresAt <= now) {
      this.#cache.delete(key)
      return null
    }

    return data
  }

  public set(key: string, data: T, expiration: Duration): void {
    this.#cache.set(key, {
      data,
      expiresAt: add(new Date(), expiration),
    })
  }

  public delete(key: string): void {
    this.#cache.delete(key)
  }
}
