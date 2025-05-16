import { api } from './axios'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const config = {
  headers: {
    Authorization: 'Bearer ' + store.Token,
  },
}

export function add(url, param) {
  return api
    .post(`${process.env.API_URL}api/v1/${url}`, param, config)
    .then((response) => {
      return response
    })
    .catch((response) => {
      return response.response
    })
}
