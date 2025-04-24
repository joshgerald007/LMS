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

<style>
.shadow_custom {
  box-shadow: 0 2px 6px #4359711f !important;
}

body.body--dark {
  background: #232733;
}

.q-dark {
  background: #2b3140 !important;
}

.q-btn .q-icon,
.q-btn .q-spinner {
  font-size: 1.715em;
}

.q-item--dark {
  color: #9ca0bb !important;
}
</style>
