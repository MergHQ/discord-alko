import { Product } from '../services/alkoService'
import { MessageContent } from 'eris'

export default ({ id, name, price, volume, abv, agentName, countryName, taste, energyPerDlKcal }: Product): MessageContent => ({
  embed: {
    url: `https://www.alko.fi/tuotteet/${id}`,
    author: {
      name,
    },
    thumbnail: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Alko.svg/1920px-Alko.svg.png'
    },
    image: {
      url: `https://images.alko.fi/images/cs_srgb,f_auto,t_products/cdn/${id}/image.jpg`
    },
    fields: [
      {
        name: '%',
        value: abv
      },
      {
        name: 'Price',
        value: `${price}€`
      },
      {
        name: 'Volume',
        value: `${volume}`
      },
      {
        name: 'Agent',
        value: agentName
      },
      {
        name: 'Country',
        value: countryName
      },
      {
        name: 'Taste',
        value: taste
      },
      {
        name: 'Energy',
        value: `${energyPerDlKcal}kcal/dl`
      }
    ]
  }
})
