import { useMediaQuery } from '@mantine/hooks'

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 62em)', false) ?? false
}
