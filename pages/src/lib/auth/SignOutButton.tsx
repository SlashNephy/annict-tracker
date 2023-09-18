import { Button } from '@mantine/core'
import React, { useEffect, useState } from 'react'

import { useCsrfToken } from './useCsrfToken.ts'

import type { MantineButtonProps } from '../../lib/mantine/types.ts'

export type SignOutButtonProps = MantineButtonProps

export function SignOutButton({ children, ...props }: SignOutButtonProps): React.JSX.Element {
  const csrfToken = useCsrfToken()

  const [origin, setOrigin] = useState('')
  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  return (
    <form action="/api/auth/signout" method="POST">
      {/* MEMO: input の value 属性を undefined にすると uncontrolled 扱いになるので回避している */}
      <input autoComplete="off" name="csrfToken" type="hidden" value={csrfToken ?? ''} />
      <input autoComplete="off" name="callbackUrl" type="hidden" value={origin} />
      <Button type="submit" {...props}>
        {children}
      </Button>
    </form>
  )
}
