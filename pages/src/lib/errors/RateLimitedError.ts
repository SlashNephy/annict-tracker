export class RateLimitedError extends Error {
  public constructor(public response: Response) {
    super()
  }
}
