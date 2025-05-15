<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} Schedule</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Room"
            v-model="schedule.room_id"
            emit-value
            map-options
            :options="roomList"
          >
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Teacher"
            v-model="schedule.teacher_id"
            emit-value
            map-options
            :options="teacherList"
          >
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Section"
            v-model="schedule.section_id"
            emit-value
            map-options
            :options="sectionList"
          >
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Days of Week"
            v-model="schedule.day_of_week"
            emit-value
            map-options
            :options="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
          >
          </q-select>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Start Time" v-model="schedule.start_time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="schedule.start_time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="End Time" v-model="schedule.end_time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="schedule.end_time">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
import { useRoute } from 'vue-router'
import { add } from 'boot/post.js'
import { edit } from 'boot/put.js'
import { Loading, Notify } from 'quasar'

const route = useRoute()

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

const schedule = ref({
  room_id: '',
  teacher_id: '',
  section_id: '',
  day_of_week: '',
  start_time: '',
  end_time: '',
  subject_id: route.params.id,
})

const emit = defineEmits(['getData', 'closeModal'])

async function submit() {
  Loading.show()
  if (AddorEdit.value === 'Add') {
    let result
    if (route.name === 'Subject Schedule') {
      result = await add('schedules/subject-schedule', schedule.value)
    } else if (route.name === 'Student Schedule') {
      result = await add('student-schedule', schedule.value)
    }
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully add a student schedule',
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
    const result = await edit('schedules', props.value.value.id, schedule.value)
    if (result.status === 200) {
      Notify.create({
        message: 'Successfully edit a student schedule',
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

let roomList = ref([])

async function getRoom() {
  const f = await collection('rooms')
  const result = f?.data?.result
  if (result) {
    roomList.value = result.map((x) => {
      return { label: x.name, value: x.id }
    })
  }
}

let teacherList = ref([])

async function getTeacher() {
  const f = await collection('teachers')
  const result = f?.data?.result
  if (result) {
    teacherList.value = result.map((x) => {
      return { label: `${x.first_name} ${x.last_name}`, value: x.id }
    })
  }
}

let sectionList = ref([])

async function getSection() {
  const f = await collection('sections')
  const result = f?.data?.result
  if (result) {
    sectionList.value = result.map((x) => {
      return { label: x.name, value: x.id }
    })
  }
}

onMounted(() => {
  if (AddorEdit.value === 'Edit') {
    schedule.value.room_id = props.value.value.room_id
    schedule.value.teacher_id = props.value.value.teacher_id
    schedule.value.section_id = props.value.value.section_id
    schedule.value.day_of_week = props.value.value.day_of_week
    schedule.value.start_time = props.value.value.start_time
    schedule.value.end_time = props.value.value.end_time
  }

  getRoom()
  getTeacher()
  getSection()
})
</script>
