<template>
  <div class="q-pb-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Manage Course" />
      <q-breadcrumbs-el label="Schedule" />
      <q-breadcrumbs-el label="Subject Schedule" />
    </q-breadcrumbs>
  </div>
  <q-card bordered no-shadow class="q-mb-md" style="box-shadow: none" v-if="route.params.id">
    <q-card-section class="row q-pb-lg q-pt-lg">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="text-subtitle1 q-px-md">
          <div class="q-pb-sm text-weight-medium">Subject Details:</div>
          <div class="row">
            <div class="col-4">
              Code:<br />
              Name:<br />
              Unit:<br />
              Price per Unit:
            </div>
            <div class="col-4">
              {{ subject?.data?.result?.code || '--' }}<br />
              {{ subject?.data?.result?.name || '--' }}<br />
              {{ subject?.data?.result?.units || '--' }}<br />
              {{ subject?.data?.result?.price_per_unit || '--' }}
            </div>
          </div>
          <div class="row">
            <div class="col-8 q-mt-sm">
              <q-btn
                @click="editModal = true"
                label="Edit"
                color="warning text-black"
                class="q-mr-md"
                size="sm"
                icon="edit_square"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-dialog v-model="editModal" persistent>
      <CreateUpdateSubject :value="{ value: subject?.data?.result || {} }" />
    </q-dialog>
  </q-card>
  <table-listing
    :columns="columns"
    :data="data"
    :name="route.name"
    :loading="loading"
    :advfilter="adv_filter"
    ref="tl"
    @getData="getData"
    @getExport="getExport"
  >
    <template #advance-filter="{}">
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Status"
            emit-value
            map-options
            v-model="adv_filter.is_active"
            :options="[
              { label: 'Active', value: 1 },
              { label: 'Inactive', value: 0 },
            ]"
          />
        </q-item-section>
      </q-item>
    </template>
    <template #create-update-modal="a" v-if="route.params.id">
      <CreateUpdate :value="a" @getData="getData" @closeModal="a.closeModal" />
    </template>
    <template #details-info-modal="a">
      <DetailsInfo :value="a" />
    </template>
    <template #confirm-delete-modal="a" v-if="route.params.id">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-exclamation" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this schedule?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Yes" color="primary" @click="deleteItem(a.value.id)" />
          <q-btn flat label="No" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </template>
  </table-listing>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TableListing from '../../../components/TableListing.vue'
import CreateUpdate from './CreateUpdate.vue'
import CreateUpdateSubject from '../subject/CreateUpdate.vue'
import DetailsInfo from './DetailsInfo.vue'
import { useRoute } from 'vue-router'
import { list, exports, show } from 'boot/get.js'
import { del } from 'boot/delete.js'
import { Loading, Notify } from 'quasar'

const route = useRoute()

const adv_filter = ref({
  is_active: '',
})

const editModal = ref(false)

const columns = [
  {
    name: 'room',
    label: 'Room',
    align: 'left',
    field: (row) => row.room.name,
    sortable: true,
  },
  {
    name: 'section',
    label: 'Section',
    align: 'left',
    field: (row) => row.section.name,
    sortable: true,
  },
  {
    name: 'teacher',
    label: 'Teacher',
    align: 'left',
    field: (row) => `${row.teacher.first_name} ${row.teacher.last_name}`,
    sortable: true,
  },
  {
    name: 'day',
    label: 'Day',
    align: 'left',
    field: 'day_of_week',
    sortable: true,
  },
  {
    name: 'start_time',
    label: 'Start Time',
    align: 'left',
    field: 'start_time',
    sortable: true,
  },
  {
    name: 'end_time',
    label: 'End Time',
    align: 'left',
    field: 'end_time',
    sortable: true,
  },
  {
    name: 'Actions',
    label: 'Actions',
    align: 'left',
    field: 'Actions',
    sortable: true,
  },
]

const tl = ref(null)

async function deleteItem(id) {
  Loading.show()
  const result = await del('schedule/subject-schedule', id)
  Loading.hide()
  if (result.status === 200) {
    tl.value.closeModal()
    getData()
  }
}

const data = ref([])
const loading = ref(false)
const subject = ref({})

async function getData(filter = {}) {
  let start = ''
  let end = ''
  let sBy = ''
  let oBy = ''
  if (filter.start) {
    start = `&start=${filter.start}`
  }
  if (filter.end) {
    end = `&end=${filter.end}`
  }

  if (filter?.page?.sortBy) {
    sBy = `&order_by=${filter.page.sortBy}`
    oBy = `&direction=${filter.page.descending ? 'asc' : 'desc'}`
  }

  let path = ''
  if (route.name === 'Schedule') {
    path = 'schedules/subject-schedule/get/subject'
  } else {
    path = `schedules/subject-schedule/subject/${route.params.id}`
  }

  loading.value = true
  const isactive = adv_filter.value.is_active ? `&is_active=${adv_filter.value.is_active}` : ''
  const result = await list(
    `${path}?search=${filter.search || ''}${isactive}&per_page=${filter.page?.rowsPerPage || 10}&page=${filter.page?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.page?.sortBy
  data.value.descending = filter.page?.descending
}

async function getSubjectDetails() {
  let result
  result = await show('subjects', route.params.id)
  subject.value = result
}

onMounted(() => {
  if (route.params.id) {
    getSubjectDetails()
  }
})

async function getExport() {
  const result = await exports(`schedules/subject-schedule`)
  if (result.status === 200) {
    Notify.create({
      message: 'Successfully export an excel',
      position: 'top-right',
      color: 'green',
      timeout: 2000,
    })
  } else {
    Notify.create({
      message: result.data.message,
      position: 'top-right',
      color: 'red',
      timeout: 2000,
    })
  }
}
</script>
