import axios from 'axios'
import logger from '../log'

const discordBotsApi = axios.create({
  baseURL: 'https://discord.bots.gg/api/v1',
  headers: {
    Authorization: process.env.DISCORD_BOTS_GG_TOKEN
  }
})

const postStats = async (guildCount: number): Promise<void> =>
  discordBotsApi
    .post(`/bots/${process.env.DISCORD_ALKO_BOT_ID}/stats`, { guildCount })
    .then(() => {
      logger.info(`Posted guild count (${guildCount}) to discord.bots.gg.`)
    })
    .catch(e => {
      logger.error(`Error posting stats to discord.bot.gg ${e}`)
    })

export default postStats
