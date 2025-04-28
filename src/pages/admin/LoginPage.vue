<template>
  <div class="main_bg">
    <div class="row" style="height: 100vh">
      <div class="col-8 q-pa-lg relative-position">
        <div
          style="
            background-image: url('https://photos.wikimapia.org/p/00/04/05/16/76_big.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            height: 100%;
            border-radius: 15px;
            opacity: 0.6;
          "
        ></div>
        <img
          alt=""
          src="/src/assets/logo.png"
          style="
            width: 200px;
            height: 200px;
            border-radius: 100px;
            position: absolute;
            top: calc(50% - 100px);
            left: calc(50% - 100px);
          "
        />
      </div>
      <div class="flex flex-center col-4">
        <q-card flat>
          <q-card-section class="q-px-lg">
            <div class="row q-mt-sm text-weight-medium" style="font-size: 23px">
              Welcome to Pinamalayan Maritime Foundation and Technological College Inc.!
            </div>
            <div class="text-caption q-mt-xs" style="color: rgb(105, 122, 141); font-size: 15px">
              Please sign-in to your account
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-px-sm">
              <q-item-label>Email</q-item-label>
              <q-input
                v-model="email"
                type="text"
                label="Enter your email"
                outlined
                dense
                class="q-py-sm"
                :hint="emailValidation || ''"
              />

              <q-item-label class="q-mt-lg">Password</q-item-label>
              <q-input
                v-model="password"
                type="password"
                label="Enter password"
                outlined
                dense
                class="q-py-sm"
                :hint="passwordValidation || ''"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <div class="row q-px-sm">
              <q-btn color="primary" label="SIGN IN" class="full-width" @click="loginSubmit()" />
            </div>
            <div class="q-ma-md text-center">
              <q-btn
                color="primary"
                flat
                label="Forgot Password?"
                class="full-width no-outline text-capitalize"
                @click="router.push({ path: '/admin/forgotpassword' })"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from 'boot/auth.js'
import { useCredentialsStore } from 'stores/credentials'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const router = useRouter()

const emailValidation = ref(false)
const passwordValidation = ref(false)

const store = useCredentialsStore()

async function loginSubmit() {
  if (!email.value) {
    emailValidation.value = 'Please enter your email.'
  } else {
    emailValidation.value = false
  }

  if (!password.value) {
    passwordValidation.value = 'Please enter your password.'
  } else {
    passwordValidation.value = false
  }

  if (emailValidation.value || passwordValidation.value) {
    return
  }
  const result = await login({ email: email.value, password: password.value })

  if (result.status !== 200) {
    emailValidation.value = result.data.message
  } else {
    store.setToken(result.data.token)
    store.setEmail(result.data.user.email)
    store.setFirstName(result.data.user.first_name)
    store.setLastName(result.data.user.last_name)

    router.push({ path: '/admin' })
  }
}
</script>

<style scoped lang="scss">
.q-dark {
  background: #232733 !important;
}

.q-banner {
  background-color: #ef5350 !important;
}

:deep() .q-field__messages {
  color: #ef5350;
}
</style>
