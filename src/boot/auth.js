import { api } from './axios'
import { Loading } from 'quasar'
import { useCredentialsStore } from '../../src/stores/credentials'

export function login(param) {
  Loading.show()
  return api
    .post(`${process.env.API_URL}login`, param)
    .then((response) => {
      Loading.hide()
      return response
    })
    .catch((e) => {
      Loading.hide()
      return e.response
    })
}

const store = useCredentialsStore()

const config = {
  headers: {
    Authorization: 'Bearer ' + store.Token,
  },
}

export function logout() {
  Loading.show()
  return api
    .post(`${process.env.API_URL}logout`, null, config)
    .then((response) => {
      Loading.hide()
      return response
    })
    .catch((e) => {
      Loading.hide()
      return e.response
    })
}
