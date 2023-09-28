import { preload } from 'swr'
import useSWRImmutable from 'swr/immutable'

type CsrfResponse = {
  csrfToken: string
}

const key = 'csrf'

void preload(key, fetchCsrfToken)

export function useCsrfToken(): string | null {
  const { data } = useSWRImmutable(key, fetchCsrfToken)

  return data?.csrfToken ?? null
}

async function fetchCsrfToken(): Promise<CsrfResponse> {
  const response = await fetch('/api/auth/csrf')

  return await response.json()
}
