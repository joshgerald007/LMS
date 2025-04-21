<template>
  <q-layout view="lHh lpR lFf">
    <HeaderComponent
      v-if="route.name !== 'Admin Login'"
      @toggle-left-drawer="leftDrawerOpen = !leftDrawerOpen"
    />

    <SideBar v-if="route.name !== 'Admin Login'" :open="leftDrawerOpen" />

    <q-page-container class="q-mx-lg" v-if="route.name !== 'Admin Login'">
      <h5 class="q-mt-lg q-mb-xs">{{ route.name }}</h5>
      <q-scroll-area style="height: calc(100vh - 190px)" class="q-mt-md">
        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-page-container v-else>
      <router-view />
    </q-page-container>

    <FooterComponent v-if="route.name !== 'Admin Login'" />
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import HeaderComponent from 'components/HeaderComponent.vue'
import FooterComponent from 'components/FooterComponent.vue'
import SideBar from 'components/SideBar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const leftDrawerOpen = ref(false)
</script>
