import useSWR from 'swr'

type CsrfResponse = {
  csrfToken: string
}

export function useCsrfToken(): string | null {
  const { data } = useSWR('csrf', fetchCsrfToken)

  return data?.csrfToken ?? null
}

async function fetchCsrfToken(): Promise<CsrfResponse> {
  const response = await fetch('/api/auth/csrf')
  return await response.json()
}
