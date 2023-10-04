import { useCounter } from '@mantine/hooks'
import { draw, random } from 'radash'
import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'

import { fetchAniListCharacters } from './fetchAniListCharacters.ts'

export type UseRandomAniListCharacterNameReturn = {
  characterName: string | null
  redraw(): void
}

export function useRandomAniListCharacterName(): UseRandomAniListCharacterNameReturn {
  const page = useMemo(() => random(0, 5), [])
  const { data } = useSWRImmutable([page], async ([page]) => await fetchAniListCharacters(page))

  // count がインクリメントされたら再計算する
  // 擬似的に再計算をトリガーできるようにしている
  const [count, { increment }] = useCounter()
  const characterName = useMemo(() => draw(data?.data.Page.characters ?? [])?.name.native ?? null, [count, data])

  return {
    characterName,
    redraw: increment,
  }
}
