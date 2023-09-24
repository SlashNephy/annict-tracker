import { IconLogin } from '@tabler/icons-react'
import React from 'react'

import { SignInButton } from '../../lib/auth/SignInButton.tsx'

export function AnnictSignInButton(): React.JSX.Element {
  return (
    <SignInButton fullWidth color="pink.6" leftSection={<IconLogin />} providerId="annict">
      Annict でログイン
    </SignInButton>
  )
}
