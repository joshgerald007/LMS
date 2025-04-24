import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar'

export const useCredentialsStore = defineStore('credentialsStore', {
  state: () => ({
    Token: LocalStorage.getItem('Token') || '',
    Email: LocalStorage.getItem('Email') || '',
    FirstName: LocalStorage.getItem('FirstName') || '',
    LastName: LocalStorage.getItem('LastName') || '',
  }),
  actions: {
    setToken(Token) {
      this.Token = Token
    },
    setEmail(Email) {
      this.Email = Email
    },
    setFirstName(FirstName) {
      this.FirstName = FirstName
    },
    setLastName(LastName) {
      this.LastName = LastName
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCredentialsStore, import.meta.hot))
}
