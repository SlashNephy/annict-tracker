import { Anchor, Card, Text } from '@mantine/core'
import React from 'react'

import packageJson from '../../package.json'

import type { CardProps } from '@mantine/core'

export function FooterCard(props: Omit<CardProps, 'children'>): React.JSX.Element {
  return (
    <Card {...props}>
      <Text>
        <Anchor href={packageJson.repository.url} target="_blank">
          {packageJson.name}
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
