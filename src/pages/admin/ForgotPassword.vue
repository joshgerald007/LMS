<template>
  <div class="main_bg">
    <div class="flex flex-center" style="height: 100vh">
      <div
        class="q-card q-card--flat no-shadow bg-white shadow_custom authentication-inner"
        style="width: 30%"
      >
        <div>
          <div class="q-card__section q-card__section--vert q-px-lg">
            <div class="row q-mt-md text-center">
              <div
                class="q-toolbar__title ellipsis text-weight-medium cursor-pointer"
                style="color: rgb(86, 106, 127); font-size: 1.6rem; letter-spacing: -0.5px"
              >
                <span class="text-primary"
                  ><div class="q-avatar" style="font-size: 32px">
                    <div class="q-avatar__content row flex-center overflow-hidden">
                      <img alt="" src="/src/assets/logo.png" />
                    </div></div></span
                ><span class="q-pl-sm">PMFTCI</span>
              </div>
            </div>
            <div class="row q-mt-lg text-grey-8" style="font-size: 21px">Forgot Password? 🔒 ️</div>
            <div class="text-caption q-mt-xs" style="color: rgb(105, 122, 141); font-size: 15px">
              Enter your email and we'll send you instructions to reset your password
            </div>
          </div>
          <div class="q-card__section q-card__section--vert q-pt-sm">
            <div class="q-px-sm">
              <div class="q-item__label text-grey-8">Email</div>
              <label
                class="q-field row no-wrap items-start q-field--outlined q-input q-field--dense q-py-sm"
                for="f_469ecc40-4a57-480e-ad6b-04d44a76157e"
                ><!---->
                <div class="q-field__inner relative-position col self-stretch">
                  <div class="q-field__control relative-position row no-wrap" tabindex="-1">
                    <div
                      class="q-field__control-container col relative-position row no-wrap q-anchor--skip"
                    >
                      <input
                        class="q-field__native q-placeholder"
                        tabindex="0"
                        id="f_469ecc40-4a57-480e-ad6b-04d44a76157e"
                        type="text"
                      /><!---->
                    </div>
                  </div>
                  <!---->
                </div>
                <!----></label
              >
            </div>
            <div class="row q-px-sm q-mt-md">
              <a
                class="q-btn q-btn-item non-selectable no-outline q-btn--standard q-btn--rectangle bg-primary text-white q-btn--actionable q-focusable q-hoverable full-width text-capitalize"
                tabindex="0"
                href="/"
                ><span class="q-focus-helper"></span
                ><span
                  class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                  ><span class="block">Send Reset Link</span></span
                ></a
              >
            </div>
            <div class="q-ma-md text-center text-grey-8">
              <button
                class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle q-btn--actionable q-focusable q-hoverable q-btn--dense text-capitalize text-primary"
                tabindex="0"
                type="button"
                @click="router.push({ path: '/admin/login' })"
              >
                <span class="q-focus-helper"></span>
                <span
                  class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                >
                  <i
                    class="q-icon on-left notranslate material-icons"
                    aria-hidden="true"
                    role="img"
                  >
                    arrow_back_ios
                  </i>
                  <span class="block">Back To Login</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { login } from 'boot/auth.js'
// import { useCredentialsStore } from 'stores/credentials'
import { useRouter } from 'vue-router'

// const email = ref('')
// const password = ref('')

const router = useRouter()

// const emailValidation = ref(false)
// const passwordValidation = ref(false)

// const store = useCredentialsStore()

// async function loginSubmit() {
//   if (!email.value) {
//     emailValidation.value = 'Please enter your email.'
//   } else {
//     emailValidation.value = false
//   }

//   if (!password.value) {
//     passwordValidation.value = 'Please enter your password.'
//   } else {
//     passwordValidation.value = false
//   }

//   if (emailValidation.value || passwordValidation.value) {
//     return
//   }
//   const result = await login({ email: email.value, password: password.value })

//   if (result.status !== 200) {
//     emailValidation.value = result.data.message
//   } else {
//     store.setToken(result.data.token)
//     store.setEmail(result.data.user.email)
//     store.setFirstName(result.data.user.first_name)
//     store.setLastName(result.data.user.last_name)

//     router.push({ path: '/admin' })
//   }
// }
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
