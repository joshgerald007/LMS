<template>
  <q-header
    reveal
    class="q-mx-lg q-mt-md q-py-sm shadow_custom"
    :class="darkmode ? 'q-dark' : ''"
    style="border-radius: 4px"
  >
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      <q-toolbar-title> </q-toolbar-title>

      <q-btn flat round icon="mdi-theme-light-dark" aria-label="Menu" @click="toggleDarkMode" />

      <q-btn
        flat
        round
        icon="mdi-view-dashboard-outline"
        aria-label="Menu"
        @click="toggleDarkMode"
        class="q-ml-xs"
      />

      <q-btn round flat icon="mdi-bell" class="q-ml-xs">
        <q-badge color="red" floating transparent> 4 </q-badge>
        <q-menu auto-close anchor="bottom right" self="top right">
          <q-list>
            <q-item v-close-popup clickable>
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

            <q-item v-close-popup clickable>
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

            <q-item v-close-popup clickable>
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

              <q-btn color="primary" label="Logout" push size="sm" @click="logoutSubmit()" />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { logout } from 'boot/auth.js'
import { useRouter } from 'vue-router'
import { useCredentialsStore } from 'stores/credentials'
import { LocalStorage } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const store = useCredentialsStore()

const profilecolor = ref()
profilecolor.value = localStorage.getItem('profile color')
if (!profilecolor.value) {
  const colorList = ['red', 'green', 'orange', 'purple']
  const randNumber = Math.floor(Math.random() * 4)
  profilecolor.value = colorList[randNumber]
  localStorage.setItem('profile color', profilecolor.value)
}

const darkmode = ref(true)
darkmode.value = localStorage.getItem('dark mode') !== 'false'
if (!darkmode.value) {
  $q.dark.toggle()
}

function toggleDarkMode() {
  $q.dark.toggle()
  darkmode.value = !darkmode.value
  localStorage.setItem('dark mode', darkmode.value)
}

const emit = defineEmits(['toggleLeftDrawer'])

function toggleLeftDrawer() {
  emit('toggleLeftDrawer')
}

async function logoutSubmit() {
  await logout()

  store.$reset()
  LocalStorage.clear()

  router.push({ path: '/admin/login' })
}
</script>
