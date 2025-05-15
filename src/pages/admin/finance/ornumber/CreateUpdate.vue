<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Generate OR Number</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Start Number" v-model="ornumber.start" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="End Number" type="text" v-model="ornumber.end" />
        </q-item-section>
      </q-item>
    </q-card>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup class="text-white" />
      <q-btn flat label="Submit" color="primary" @click="submit()" class="text-white" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { add } from 'boot/post.js'
import { show } from 'boot/get.js'
import { Loading, Notify } from 'quasar'

const ornumber = ref({
  start: '',
  end: '',
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  const result = await add('finance/or-number', ornumber.value)
  if (result.status === 200) {
    Notify.create({
      message: 'Successfully add an OR number',
      position: 'top-right',
      color: 'green',
      timeout: 2000,
    })
    emit('getData')
    emit('closeModal')
  } else {
    Notify.create({
      message: result.data.message,
      position: 'top-right',
      color: 'red',
      timeout: 2000,
    })
  }
  Loading.hide()
}

async function getStartNumber() {
  Loading.show()
  const result = await show('finance/or-number/last/record', '')
  ornumber.value.start = result?.data?.result?.increment_number || ''
  Loading.hide()
}

onMounted(() => {
  getStartNumber()
})
</script>
