import type { SyobocalProgram, SyobocalProgramsResponse } from 'functions/api/syobocal/programs.types.ts'

export async function lookupSyobocalPrograms(tids: number[]): Promise<SyobocalProgram[]> {
  // CORS でオリジナルの API を叩けないので Cloudflare Workers でプロキシする
  const response = await fetch(`/api/syobocal/programs?id=${tids.join(',')}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: SyobocalProgramsResponse = await response.json()
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.result
}
