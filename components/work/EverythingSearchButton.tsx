import { Button } from '@mantine/core'
import React, { useMemo } from 'react'

import { useLibraryEntry } from '../../lib/useLibraryEntry'

import type { ButtonProps } from '@mantine/core'

export const EverythingSearchButton: React.FC<Omit<ButtonProps, 'disabled'>> = (props) => {
  const { entry } = useLibraryEntry()

  const isDisabled = useMemo(() => {
    // エピソード情報がない
    if (entry.nextEpisode === null) {
      return true
    }

    // まだ放送されていない
    return entry.nextProgramStartAt !== null && new Date() < entry.nextProgramStartAt
  }, [entry])

  return (
    <Button
      {...props}
      disabled={isDisabled}
      onClick={() => {
        window.open(`es:${entry.work.title}`)
      }}
    >
      Everything
    </Button>
  )
}
