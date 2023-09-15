import type { SyobocalProgramsResponse, SyobocalProgramsResult } from 'functions/api/syobocal/programs.types.ts'

export const lookupPrograms = async (tids: number[]): Promise<SyobocalProgramsResult> => {
  const response = await fetch(`https://annict-tracker.pages.dev/api/syobocal/programs?id=${tids.join(',')}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = (await response.json()) as SyobocalProgramsResponse
  if (!data.success) {
    throw new Error(data.error)
  }

  return data.result
}
