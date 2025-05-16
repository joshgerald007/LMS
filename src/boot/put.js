import { api } from './axios'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const config = {
  headers: {
    Authorization: 'Bearer ' + store.Token,
  },
}

export function edit(url, id, param) {
  return api
    .put(`${process.env.API_URL}api/v1/${url}/${id}`, param, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}
