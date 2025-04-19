<template>
<<<<<<< Updated upstream
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
=======
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
>>>>>>> Stashed changes
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
<<<<<<< Updated upstream
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]
=======
import HeaderComponent from 'components/HeaderComponent.vue'
import FooterComponent from 'components/FooterComponent.vue'
import SideBar from 'components/SideBar.vue'
import { useRoute } from 'vue-router'
>>>>>>> Stashed changes

const route = useRoute()
const leftDrawerOpen = ref(false)
<<<<<<< Updated upstream

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
=======
>>>>>>> Stashed changes
</script>
