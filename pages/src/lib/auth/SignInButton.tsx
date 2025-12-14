import { Button } from '@mantine/core'
import { type ReactNode } from 'react'

import { useCsrfToken } from './useCsrfToken.ts'

import type { ButtonProps } from '@mantine/core'

export type SignInButtonProps = ButtonProps & {
  providerId: string
}

export function SignInButton({ providerId, children, ...props }: SignInButtonProps): ReactNode {
  const csrfToken = useCsrfToken()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <form action={`/api/auth/signin/${providerId}`} method="POST">
      {/* MEMO: input の value 属性を undefined にすると uncontrolled 扱いになるので回避している */}
      <input autoComplete="off" name="csrfToken" type="hidden" value={csrfToken ?? ''} />
      <input autoComplete="off" name="callbackUrl" type="hidden" value={origin} />
      <Button type="submit" {...props}>
        {children}
      </Button>
    </form>
  )
}
