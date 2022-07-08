import { Client } from 'discord.js'

import { env } from './env'
import { annictSdk } from './services/annict'
import { convertIntoAnnictId } from './services/arm'
import { fetchSayaDefinitions } from './services/saya'
import { lookupPrograms, lookupTitles } from './services/syobocal'

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES'],
})

client.once('ready', () => {
  console.info(`Bot connected to Discord as ${client.user?.tag}.`)
})

client.login(env.DISCORD_BOT_TOKEN).catch(console.error)

lookupPrograms().then(async (result) => {
  const programs = result.ProgLookupResponse?.ProgItems?.ProgItem
  if (!programs) {
    return
  }

  const syobocalIds = new Set(programs.map((item) => item.TID))

  const titles = await lookupTitles(Array.from(syobocalIds))
  if (!titles.TitleLookupResponse) {
    return
  }

  const annictIds = Array.from(syobocalIds)
    .map((id) => convertIntoAnnictId(id))
    .filter((id) => id) as number[]
  const works = await annictSdk.FetchWorksByIds({
    annictIds,
  })

  const definitions = await fetchSayaDefinitions()

  for (const item of programs) {
    const channel = definitions.channels.find((channel) => channel.syobocalId === item.ChID)
    const title = titles.TitleLookupResponse.TitleItems.TitleItem.find((title) => title.TID === item.TID)
    // const work = works.searchWorks?.edges

    console.log(`[${title?.Title}] ${item.STSubTitle}: ${channel?.name}`)
    console.log(Date.parse(item.StTime))
    console.log(item)
  }
})
