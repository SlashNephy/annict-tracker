import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import React from 'react'

import type { ButtonProps } from '@mantine/core'

export function AnnictSignInButton(props: ButtonProps): React.ReactElement {
  return (
    <Button
      {...props}
      onClick={() => {
        signIn('annict').catch(console.error)
      }}
    >
      Annict でログイン
    </Button>
  )
}
