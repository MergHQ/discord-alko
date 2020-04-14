import * as Bacon from 'baconjs'
import * as Eris from 'eris'
import Message from './message'
import logger from './log'
import { dispatch, actionStream } from './actions'
import productSearchController from './controllers/productSearchController'
import infoController from './controllers/infoController'
import postDiscordBotsStats from './utils/discordBotsStatusUpdater'

const client = Eris(process.env.DISCORD_BOT_TOKEN)

client.on('ready', () => logger.info('Bot is in ready state.'))
client.on('guildCreate', ({ name }) => logger.info(`New guild: ${name}`))
client.on('messageCreate', messageCreateEvent => dispatch('NEW_MESSAGE', messageCreateEvent))

productSearchController()
infoController()

actionStream<Message | null>('SEND_MESSAGE')
  .filter(message => !!message)
  .flatMapLatest(({ channelID, content }) => Bacon.fromPromise(
    client.createMessage(channelID, content)
  ))
  .onError(error => logger.error(`Error sending message ${error}`))

// Post stats
postDiscordBotsStats(client.guilds.size)
setInterval(() => postDiscordBotsStats(client.guilds.size), 600000)

client.connect()
