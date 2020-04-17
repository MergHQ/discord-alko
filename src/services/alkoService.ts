import axios from 'axios'

const alkoApi = axios.create({
  baseURL: `${process.env.ALKO_API_BASE_URL}/v1`,
  headers: {
    'x-api-key': process.env.ALKO_API_KEY,
    'Content-Type': 'application/json'
  }
})

const fixedSearchParams = {
  orderby: "name asc",
  top: 1
}

export interface SearchResult {
  id: string;
  name: string;
  volume: number;
  price: number;
}

export interface Product {
  id: string;
  abv: string;
  agentName: string;
  countryName: string;
  energyPerDlKcal: string;
  name: string;
  price: string;
  pricePerLitre: string;
  taste: string;
  volume: string;
}

const getProductById = (productId: string): Promise<Product | null> =>
  alkoApi
    .get(`/products/${productId}`)
    .then(({ data }) => data)
    .then(
      ({
        id,
        abv,
        agentName,
        countryName,
        energyPerDlKcal,
        name,
        price,
        pricePerLitre,
        taste,
        volume,
      }) => ({
        id,
        abv,
        agentName,
        countryName,
        energyPerDlKcal,
        name,
        price,
        pricePerLitre,
        taste,
        volume,
      })
    )
    .catch(() => null)

export const searchProduct = (searchTerm: string): Promise<Product | null> =>
  alkoApi
    .post('/products/search', { ...fixedSearchParams, freeText: searchTerm })
    .then(({ data }) => data.value)
    .then(products =>
      products.length > 0 ?
      getProductById(products[0].id) :
      null)
