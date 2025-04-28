<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} School Year</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="schoolyear.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            outlined
            dense
            label="Description"
            type="textarea"
            v-model="schoolyear.description"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Status"
            emit-value
            map-options
            :options="[
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 },
            ]"
            v-model="schoolyear.is_active"
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

const schoolyear = ref({
  name: '',
  description: '',
  is_active: 1,
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('school-years', schoolyear.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully add a school year',
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
    const result = await edit('school-years', props.value.value.id, schoolyear.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully edit a school year',
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
    schoolyear.value.name = props.value.value.name
    schoolyear.value.description = props.value.value.description
    schoolyear.value.is_active = props.value.value.is_active
  }
})
</script>
