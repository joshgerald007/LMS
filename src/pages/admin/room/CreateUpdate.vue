<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Room</div>
    </q-card-section>

    <q-separator />
    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="room.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Description" type="textarea" v-model="room.description" />
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
            v-model="room.is_active"
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

const room = ref({
  name: '',
  description: '',
  is_active: 1,
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('rooms', room.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully add a room',
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
    const result = await edit('rooms', props.value.value.id, room.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully edit a room',
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
    room.value.name = props.value.value.name
    room.value.description = props.value.value.description
    room.value.is_active = props.value.value.is_active
  }
})
</script>
