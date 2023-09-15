import React from 'react'

import { SignInButton } from '../lib/auth/SignInButton.tsx'

import type { SignInButtonProps } from '../lib/auth/SignInButton.tsx'

export type AnnictSignInButtonProps = Omit<SignInButtonProps, 'providerId' | 'children'>

export function AnnictSignInButton(props: AnnictSignInButtonProps): React.JSX.Element {
  return (
    <SignInButton providerId="annict" {...props}>
      Annict でログイン
    </SignInButton>
  )
}
