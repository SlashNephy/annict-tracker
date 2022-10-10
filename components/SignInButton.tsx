import { Button } from '@mantine/core'
import { IconLogin } from '@tabler/icons'
import { signIn } from 'next-auth/react'
import React from 'react'

export const SignInButton: React.FC = () => {
  return (
    <Button fullWidth color="pink.6" leftIcon={<IconLogin />} onClick={() => void signIn('annict')}>
      Annict でログイン
    </Button>
  )
}
