import { Anchor, Card, Text } from '@mantine/core'
import React from 'react'

import type { CardProps } from '@mantine/core'

export function FooterCard(props: Omit<CardProps, 'children'>): React.JSX.Element {
  return (
    <Card {...props}>
      <Text>
        <Anchor href="https://github.com/SlashNephy/annict-tracker" target="_blank">
          annict-tracker
        </Anchor>{' '}
        made with &hearts; by{' '}
        <Anchor href="https://github.com/SlashNephy" target="_blank">
          @SlashNephy
        </Anchor>
        .
      </Text>
    </Card>
  )
}
