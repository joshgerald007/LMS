<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Subject</div>
    </q-card-section>

    <q-separator />
    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Code" v-model="subject.code" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="subject.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input type="number" outlined dense label="Units" v-model="subject.units" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            type="number"
            outlined
            dense
            label="Price per Unit"
            v-model="subject.price_per_unit"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            outlined
            dense
            label="Description"
            type="textarea"
            v-model="subject.description"
          />
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

const subject = ref({
  code: '',
  name: '',
  description: '',
  units: '',
  price_per_unit: '',
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('subjects', subject.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully add a subject',
        position: 'top-right',
        color: 'green',
        timeout: 2000,
      })
      emit('getData')
      emit('closeModal')
    } else {
      Notify.create({ message: result.message, position: 'top-right', color: 'red', timeout: 2000 })
    }
  } else if (AddorEdit.value === 'Edit') {
    const result = await edit('subjects', props.value.value.id, subject.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully edit a subject',
        position: 'top-right',
        color: 'green',
        timeout: 2000,
      })
      emit('getData')
      emit('closeModal')
    } else {
      Notify.create({ message: result.message, position: 'top-right', color: 'red', timeout: 2000 })
    }
  }
  Loading.hide()
}

onMounted(() => {
  if (AddorEdit.value === 'Edit') {
    subject.value.code = props.value.value.code
    subject.value.name = props.value.value.name
    subject.value.description = props.value.value.description
    subject.value.units = props.value.value.units
    subject.value.price_per_unit = props.value.value.price_per_unit
  }
})
</script>
