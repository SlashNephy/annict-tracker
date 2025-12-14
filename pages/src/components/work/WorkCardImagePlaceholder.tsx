import { Box, Center } from '@mantine/core'
import { IconPhotoOff } from '@tabler/icons-react'

import type { ReactNode } from 'react'

export function WorkCardImagePlaceholder(): ReactNode {
  return (
    <Center h={200}>
      <Box>
        <IconPhotoOff />
      </Box>
    </Center>
  )
}
