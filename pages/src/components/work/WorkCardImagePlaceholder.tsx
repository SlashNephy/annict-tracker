import { Box, Center } from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons-react'
import React from 'react'

export function WorkCardImagePlaceholder(): React.JSX.Element {
  return (
    <Center h={200}>
      <Box>
        <IconPhotoOff />
      </Box>
    </Center>
  )
}
