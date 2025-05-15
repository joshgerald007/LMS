<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Other Payment</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="otherpayment.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            outlined
            dense
            label="Description"
            type="textarea"
            v-model="otherpayment.description"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Amount" type="text" v-model="otherpayment.amount" />
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
import { ref, computed, onMounted } from 'vue'
import { add } from 'boot/post.js'
import { edit } from 'boot/put.js'
import { Loading, Notify } from 'quasar'

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const AddorEdit = computed(() => {
  if (props.value.value.id) {
    return 'Edit'
  }

  return 'Add'
})

const otherpayment = ref({
  name: '',
  description: '',
  amount: '',
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('finance/other-payments', otherpayment.value)
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully add an other payment',
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
  } else if (AddorEdit.value === 'Edit') {
    const result = await edit('finance/other-payments', props.value.value.id, otherpayment.value)
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully edit an other payment',
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
  }
  Loading.hide()
}

onMounted(() => {
  if (AddorEdit.value === 'Edit') {
    otherpayment.value.name = props.value.value.name
    otherpayment.value.description = props.value.value.description
    otherpayment.value.amount = props.value.value.amount
  }
})
</script>
