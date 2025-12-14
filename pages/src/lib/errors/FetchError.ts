export class FetchError extends Error {
  public constructor(public error: unknown) {
    super()
  }
}
