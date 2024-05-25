import { Client, Provider, cacheExchange, fetchExchange } from 'urql'

const GRAPHQL_ENDPOINT = 'https://demo.pixelkube.io/graphql'
const client = new Client({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
})

export default client
