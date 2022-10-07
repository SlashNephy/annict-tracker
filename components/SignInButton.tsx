import { Button } from '@mantine/core'
import { IconLogin } from '@tabler/icons'
import { signIn } from 'next-auth/react'
import React from 'react'

export const SignInButton: React.FC = () => {
  return (
    <Button leftIcon={<IconLogin />} onClick={() => void signIn('annict')}>
      Sign In
    </Button>
  )
}
