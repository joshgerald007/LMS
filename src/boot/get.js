import { api } from './axios'
import { apiUrl } from './conf.json'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const config = {
  headers: {
    Authorization: 'Bearer ' + store.Token,
  },
}

export function list(url) {
  return api
    .get(`${apiUrl}api/v1/${url}`, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}

export function collection(url) {
  return api
    .get(`${apiUrl}api/v1/${url}/get/collection`, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}

export function exports(url) {
  return api
    .get(`${apiUrl}api/v1/${url}/export`, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}

export function show(url, id) {
  return api
    .get(`${apiUrl}api/v1/${url}/${id}`, config)
    .then((response) => {
      return response
    })
    .catch(() => {
      return 'error'
    })
}
