import { api } from './axios'
import { apiUrl } from './conf.json'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const config = {
  headers: {
    Authorization: 'Bearer ' + store.Token,
  },
}

export function del(url, id) {
  return api
    .delete(`${apiUrl}api/v1/${url}/${id}`, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}
