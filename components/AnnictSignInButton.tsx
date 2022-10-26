import { Button } from '@mantine/core'
import { signIn } from 'next-auth/react'
import React from 'react'

import type { ButtonProps } from '@mantine/core'

export const AnnictSignInButton: React.FC<ButtonProps> = (props) => {
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
