export class HttpError extends Error {
  public constructor(public response: Response) {
    super()
  }
}
