export class FetchError extends Error {
  // eslint-disable-next-line n/handle-callback-err
  public constructor(public error: unknown) {
    super()
  }
}
