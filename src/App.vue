<template>
  <router-view />
</template>

<script setup>
import { LocalStorage } from 'quasar'
import { useCredentialsStore } from '../src/stores/credentials'

const store = useCredentialsStore()
store.$subscribe((mutation, state) => {
  LocalStorage.set('Token', state.Token)
  LocalStorage.set('Email', state.Email)
  LocalStorage.set('FirstName', state.FirstName)
  LocalStorage.set('LastName', state.LastName)
})
</script>
