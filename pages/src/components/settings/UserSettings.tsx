import { Avatar, Group, Stack, Text } from '@mantine/core'
import { IconLogout, IconUser, type ReactNode } from '@tabler/icons-react'

import { SignOutButton } from '../../lib/auth/SignOutButton.tsx'
import { useAnnictSession } from '../../lib/auth/useAnnictSession.ts'
import { AnnictSignInButton } from '../tracker/AnnictSignInButton.tsx'

export function UserSettings(): ReactNode {
  const session = useAnnictSession()

  return (
    <Stack>
      <Group>
        <IconUser />
        <Text>Annict アカウント</Text>
      </Group>

      <Group ml="xl" p="md">
        {session
          ? (
              <>
                <Avatar mr="md" src={session.user?.image ?? null} />

                <Text>{session.user?.name}</Text>

                <SignOutButton color="red" leftSection={<IconLogout size={14} />}>
                  ログアウト
                </SignOutButton>
              </>
            )
          : (
              <>
                <Text>現在 Annict アカウントでログインしていません。</Text>

                <AnnictSignInButton />
              </>
            )}
      </Group>
    </Stack>
  )
}
