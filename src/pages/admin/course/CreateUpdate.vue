<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Course</div>
    </q-card-section>

    <q-separator />
    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Code" v-model="course.code" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="course.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Faculty"
            v-model="course.faculty_id"
            emit-value
            map-options
            :options="facultyList"
          >
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            outlined
            dense
            label="Description"
            type="textarea"
            v-model="course.description"
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
            v-model="course.is_active"
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
import { collection } from 'boot/get.js'
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

const course = ref({
  name: '',
  description: '',
  is_active: 1,
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    const result = await add('course', course.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully add a course',
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
    const result = await edit('course', props.value.value.id, course.value)
    if (!result.error) {
      Notify.create({
        message: 'Successfully edit a course',
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

let facultyList = ref([])

async function getFaculty() {
  const f = await collection('faculties', course.value)
  const result = f?.data?.result
  if (result) {
    facultyList.value = result.map((x) => {
      return { label: x.name, value: x.id }
    })
  }
}

onMounted(() => {
  if (AddorEdit.value === 'Edit') {
    course.value.code = props.value.value.code
    course.value.name = props.value.value.name
    course.value.description = props.value.value.description
    course.value.faculty_id = props.value.value.faculty_id
    course.value.is_active = props.value.value.is_active
  }

  getFaculty()
})
</script>
