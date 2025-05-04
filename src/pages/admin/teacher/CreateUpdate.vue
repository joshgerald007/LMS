<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Teacher</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="First Name" v-model="teacher.first_name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Last Name" v-model="teacher.last_name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Email" v-model="teacher.email" />
        </q-item-section>
      </q-item>
      <q-item v-if="AddorEdit === 'Add'">
        <q-item-section justify-center>
          <q-input outlined type="password" dense label="Password" v-model="teacher.password" />
        </q-item-section>
      </q-item>
      <q-item v-if="AddorEdit === 'Add'">
        <q-item-section justify-center>
          <q-input
            outlined
            type="password"
            dense
            label="Confirm Password"
            v-model="teacher.confirm_password"
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

const teacher = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: 1,
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('teachers', teacher.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully add a teacher',
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
    const result = await edit('teachers', props.value.value.id, teacher.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully edit a teacher',
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
    teacher.value.first_name = props.value.value.first_name
    teacher.value.last_name = props.value.value.last_name
    teacher.value.email = props.value.value.email
    teacher.value.password = ''
    teacher.value.confirm_password = ''
  }
})
</script>
