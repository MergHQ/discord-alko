import * as Bacon from 'baconjs'
import { actionStream, dispatch } from '../actions'
import { Message } from 'eris'
import { searchProduct } from '../services/alkoService'
import searchTemplate from '../templates/searchTemplate'

const resolveSearchTerm = (message: string): string | null=> {
  const splitted = message.split('%alko search')
  return splitted.length === 2 ? splitted[1] : null
}

const productSearchController = (): void => {
  const newMessageS = actionStream<Message>('NEW_MESSAGE')

  newMessageS
    .map(({ content, channel }) => ({
      channelID: channel.id,
      content: resolveSearchTerm(content)
    }))
    .filter(({ content }) => !!content)
    .flatMapLatest(({ content, channelID }) => Bacon.fromPromise(
      searchProduct(content)
        .then(searchResult => ({
          channelID,
          content: searchTemplate(searchResult)
        }))
    ))
    .mapError(() => null)
    .onValue(message => dispatch('SEND_MESSAGE', message))
}

export default productSearchController
