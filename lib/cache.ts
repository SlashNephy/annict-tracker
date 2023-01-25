import { hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds } from 'date-fns'

export type CacheManagerOption = {
  storage?(): Storage
}

type CachedValue<T> = {
  value: T
  expiresAt?: number
}

export type Duration = {
  milliseconds?: number
  seconds?: number
  minutes?: number
  hours?: number
  days?: number
  years?: number
}

export type GetOption<T> = {
  default?: T
}

export type SetOption = {
  ttl?: Duration
}

export class CacheManager {
  readonly #storage: () => Storage

  public constructor(option?: CacheManagerOption) {
    this.#storage = option?.storage ?? (() => localStorage)
  }

  public get<T>(key: string, option?: GetOption<T>): T | undefined {
    const value = this._load<T>(key)
    if (value === null) {
      return option?.default
    }

    if (value.expiresAt !== undefined && value.expiresAt < Date.now()) {
      return option?.default
    }

    return value.value
  }

  public set<T>(key: string, value: T, option?: SetOption): void {
    this._save(key, {
      value,
      expiresAt: this._calculateExpiresAt(option?.ttl),
    })
  }

  public delete(key: string): void {
    this.#storage().removeItem(key)
  }

  private _calculateExpiresAt(duration?: Duration): number | undefined {
    let span = 0

    if (duration?.milliseconds !== undefined) {
      span += duration.milliseconds
    }
    if (duration?.seconds !== undefined) {
      span += secondsToMilliseconds(duration.seconds)
    }
    if (duration?.minutes !== undefined) {
      span += minutesToMilliseconds(duration.minutes)
    }
    if (duration?.hours !== undefined) {
      span += hoursToMilliseconds(duration.hours)
    }
    if (duration?.days !== undefined) {
      span += hoursToMilliseconds(duration.days * 24)
    }
    if (duration?.years !== undefined) {
      span += hoursToMilliseconds(duration.years * 365 * 24)
    }

    if (span === 0) {
      return
    }

    return Date.now() + span
  }

  private _load<T>(key: string): CachedValue<T> | null {
    const data = this.#storage().getItem(key)
    if (data === null) {
      return null
    }

    return JSON.parse(data)
  }

  private _save<T>(key: string, value: CachedValue<T>): void {
    const data = JSON.stringify(value)
    this.#storage().setItem(key, data)
  }
}

export const LocalStorageCacheManager = new CacheManager()
