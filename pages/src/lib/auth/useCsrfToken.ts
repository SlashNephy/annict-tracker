import { useQuery } from '@tanstack/react-query'

type CsrfResponse = {
  csrfToken: string
}

export function useCsrfToken(): string | null {
  const { data } = useQuery<CsrfResponse>(['csrf'], async () => {
    const response = await fetch('/api/auth/csrf')
    return await response.json()
  })

  return data?.csrfToken ?? null
}
