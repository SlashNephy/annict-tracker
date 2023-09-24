export function buildHttpsUri(url: string): string {
  return `/api/httpsfy?url=${encodeURIComponent(url)}`
}
