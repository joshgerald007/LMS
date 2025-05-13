<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Student</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="First Name" v-model="student.first_name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Last Name" v-model="student.last_name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Email" v-model="student.email" />
        </q-item-section>
      </q-item>
      <q-item v-if="AddorEdit === 'Add'">
        <q-item-section justify-center>
          <q-input outlined type="password" dense label="Password" v-model="student.password" />
        </q-item-section>
      </q-item>
      <q-item v-if="AddorEdit === 'Add'">
        <q-item-section justify-center>
          <q-input
            outlined
            type="password"
            dense
            label="Confirm Password"
            v-model="student.confirm_password"
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

const student = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('student', student.value)
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully add a student',
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
    const result = await edit('student', props.value.value.id, student.value)
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully edit a student',
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
    student.value.first_name = props.value.value.first_name
    student.value.last_name = props.value.value.last_name
    student.value.email = props.value.value.email
    student.value.password = ''
    student.value.confirm_password = ''
  }
})
</script>
