import { IconLogin } from '@tabler/icons-react'

import { SignInButton } from '../../lib/auth/SignInButton.tsx'

import type { ReactNode } from 'react'

export function AnnictSignInButton(): ReactNode {
  return (
    <SignInButton fullWidth color="pink.6" leftSection={<IconLogin />} providerId="annict">
      Annict でログイン
    </SignInButton>
  )
}
