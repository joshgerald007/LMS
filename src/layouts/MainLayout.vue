<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-blue-8">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm"
        />
        <q-avatar> <img src="/src/assets/logo.png" /> </q-avatar>
        <q-toolbar-title>
          Pinamalayan Maritime Foundation and Technology College Inc
        </q-toolbar-title>

        <q-toggle v-model="darkmode" @click="toggleDarkMode" label="Dark Mode" color="blue-10" />

        <q-btn dense round flat icon="mdi-bell" class="q-ml-md">
          <q-badge color="red" floating transparent> 4 </q-badge>
          <q-menu auto-close anchor="bottom right" self="top right">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="mdi-town-hall" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Townhall Meeting</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" color="amber" />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="assignment" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Generate Report</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="mdi-check-circle" color="green-5" />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-avatar icon="mdi-account-school" color="primary" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Failed Student</q-item-label>
                  <q-item-label caption>February 22, 2016</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="warning" color="red" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn dense :color="`${profilecolor}-6`" round class="q-ml-md" label="J">
          <q-menu auto-close anchor="bottom right" self="top right">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6">Settings</div>
                <q-toggle v-model="darkmode" @click="toggleDarkMode" label="Dark Mode" />

                <q-btn
                  color="primary"
                  icon-right="mdi-open-in-new"
                  size="sm"
                  label="Manage Account"
                />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="55px" :color="`${profilecolor}-6`" text-color="white"> J </q-avatar>

                <div class="text-subtitle1 q-mb-xs">John Doe</div>

                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <SideBar :open="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <div class="q-ml-sm">{{ copyrightNotice }}</div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import SideBar from 'components/SideBar.vue'
<<<<<<< Updated upstream

const leftDrawerOpen = ref(false)
const $q = useQuasar()

const profilecolor = ref()
profilecolor.value = localStorage.getItem('profilecolor')
if (!profilecolor.value) {
  const colorList = ['red', 'green', 'orange', 'purple']
  const randNumber = Math.floor(Math.random() * 4)
  profilecolor.value = colorList[randNumber]
}

const darkmode = ref(true)
darkmode.value = localStorage.getItem('darkmode') === 'false' ? false : true
if (!darkmode.value) {
  $q.dark.toggle()
}

const copyrightNotice = ref(
  `© ${new Date().getFullYear()} Pinamalayan Maritime Foundation and Technology College Inc. All rights reserved.`,
)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkmode', darkmode.value)
=======
import { useRoute, useRouter } from 'vue-router'
import { useCredentialsStore } from '../../src/stores/credentials'

const store = useCredentialsStore()

const route = useRoute()
const router = useRouter()
const leftDrawerOpen = ref(false)

if (route.name === 'Admin Login' && store.Token) {
  router.push({ path: '/admin' })
} else if (route.name !== 'Admin Login' && !store.Token) {
  router.push({ path: '/admin/login' })
>>>>>>> Stashed changes
}
</script>
