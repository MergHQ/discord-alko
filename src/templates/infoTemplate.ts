import { MessageContent } from 'eris'

const info: MessageContent = {
  embed: {
    author: {
      name: 'Alko'
    },
    thumbnail: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Alko.svg/1920px-Alko.svg.png'
    },
    fields: [
      {
        name: 'Commands',
        value: '**%alko search [product name]** - searches alkos website for given product name\n\n**%alko help** - posts info about this bot'
      },
      {
        name: 'Other',
        value: '**Feature requests and questions: ** <@105754113572102144>'
      }
    ],
  }
}

export default info
