import dotenv from 'dotenv'

dotenv.config()

export type EnvironmentVariables = NodeJS.ProcessEnv & {
  DISCORD_BOT_TOKEN?: string
  ANNICT_ACCESS_TOKEN?: string
  DISCORD_TEXT_CHANNEL_ID?: string
}

export const env = process.env as EnvironmentVariables
