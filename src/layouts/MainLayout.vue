<template>
  <q-layout view="lHh lpR lFf">
    <HeaderComponent
      v-if="route.name !== 'Admin Login' && route.name !== 'Forgot Password'"
      @toggle-left-drawer="leftDrawerOpen = !leftDrawerOpen"
    />

    <SideBar
      v-if="route.name !== 'Admin Login' && route.name !== 'Forgot Password'"
      :open="leftDrawerOpen"
    />

    <q-page-container
      class="q-mx-lg"
      v-if="route.name !== 'Admin Login' && route.name !== 'Forgot Password'"
    >
      <h5 class="q-mt-lg q-mb-xs">{{ route.name }}</h5>
      <q-scroll-area style="height: calc(100vh - 190px)" class="q-mt-md">
        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-page-container v-else>
      <router-view />
    </q-page-container>

    <FooterComponent v-if="route.name !== 'Admin Login' && route.name !== 'Forgot Password'" />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from 'components/HeaderComponent.vue'
import FooterComponent from 'components/FooterComponent.vue'
import SideBar from 'components/SideBar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const route = useRoute()
const router = useRouter()
const leftDrawerOpen = ref(false)

if ((route.name === 'Admin Login' || route.name === 'Forgot Password') && store.Token) {
  router.push({ path: '/admin' })
} else if (route.name !== 'Admin Login' && route.name !== 'Forgot Password' && !store.Token) {
  router.push({ path: '/admin/login' })
}
</script>
