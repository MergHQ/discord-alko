import { actionStream, dispatch } from '../actions'
import { Message } from 'eris'
import infoTemplate from '../templates/infoTemplate'

const COMMAND = '%alko help'

const infoController = (): void => {
  const newMessageS = actionStream<Message>('NEW_MESSAGE')

  newMessageS
    .filter(({ content }) => content === COMMAND)
    .map(({ channel }) => ({
      channelID: channel.id,
      content: infoTemplate
    }))
    .mapError(() => null)
    .onValue(message => dispatch('SEND_MESSAGE', message))
}

export default infoController
