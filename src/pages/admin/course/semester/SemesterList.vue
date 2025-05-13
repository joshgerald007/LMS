<template>
  <div class="q-pb-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Manage Course" />
      <q-breadcrumbs-el label="Semester" />
    </q-breadcrumbs>
  </div>
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
    <template #create-update-modal="a">
      <CreateUpdate :value="a" @getData="getData" @closeModal="a.closeModal" />
    </template>
    <template #details-info-modal="a">
      <DetailsInfo :value="a" />
    </template>
    <template #confirm-delete-modal="a">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-exclamation" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this semester?</span>
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
import { ref } from 'vue'
import TableListing from '../../../../components/TableListing.vue'
import CreateUpdate from './CreateUpdate.vue'
import DetailsInfo from './DetailsInfo.vue'
import { useRoute } from 'vue-router'
import { list, exports } from 'boot/get.js'
import { del } from 'boot/delete.js'
import { date, Loading, Notify } from 'quasar'

const route = useRoute()

const adv_filter = ref({
  is_active: '',
})

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'SchoolYear',
    label: 'School Year',
    align: 'left',
    field: (row) => {
      return `${row.year_start} - ${row.year_end}`
    },
    sortable: true,
  },
  {
    name: 'EvaluationStartDate',
    label: 'Evaluation Date',
    align: 'left',
    field: (row) => {
      let sDate = new Date(row.start_date)
      let eDate = new Date(row.end_date)

      return `${date.formatDate(sDate, 'MMMM DD,YYYY')} - ${date.formatDate(eDate, 'MMMM DD,YYYY')}`
    },
    sortable: true,
  },
  {
    name: 'is_active',
    label: 'Status',
    align: 'left',
    field: (row) => {
      if (row.is_active) {
        return { label: 'Active', badgeColor: 'green' }
      }
      return { label: 'Inactive', badgeColor: 'red' }
    },
    sortable: true,
    tag: 'badge',
  },
  {
    name: 'Actions',
    label: 'Actions',
    align: 'left',
    field: 'Actions',
    sortable: false,
  },
]

const tl = ref(null)

async function deleteItem(id) {
  Loading.show()
  const result = await del('semesters', id)
  Loading.hide()
  if (result.status === 200) {
    tl.value.closeModal()
    getData()
  }
}

const data = ref([])
const loading = ref(false)

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
  } else {
    sBy = `&order_by=created_at`
    oBy = `&direction=desc`
  }

  loading.value = true
  const isactive = adv_filter.value.is_active ? `&is_active=${adv_filter.value.is_active}` : ''
  const result = await list(
    `semesters?search=${filter.search || ''}${isactive}&per_page=${filter.page?.rowsPerPage || 10}&page=${filter.page?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.page?.sortBy
  data.value.descending = filter.page?.descending
}

async function getExport() {
  const result = await exports(`semesters`)
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
