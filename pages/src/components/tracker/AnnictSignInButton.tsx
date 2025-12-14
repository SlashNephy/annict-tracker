import { IconLogin, type ReactNode } from '@tabler/icons-react'

import { SignInButton } from '../../lib/auth/SignInButton.tsx'

export function AnnictSignInButton(): ReactNode {
  return (
    <SignInButton fullWidth color="pink.6" leftSection={<IconLogin />} providerId="annict">
      Annict でログイン
    </SignInButton>
  )
}
