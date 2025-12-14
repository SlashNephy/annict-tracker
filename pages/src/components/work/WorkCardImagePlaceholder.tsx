import { Box, Center } from '@mantine/core'
import { IconPhotoOff, type ReactNode } from '@tabler/icons-react'

export function WorkCardImagePlaceholder(): ReactNode {
  return (
    <Center h={200}>
      <Box>
        <IconPhotoOff />
      </Box>
    </Center>
  )
}
