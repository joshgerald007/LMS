<template>
  <div class="q-pb-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Audit Trail" />
    </q-breadcrumbs>
  </div>
  <table-listing
    :columns="columns"
    :data="data"
    :name="route.name"
    :loading="loading"
    ref="tl"
    @getData="getData"
    @getExport="getExport"
  >
    <template #details-info-modal="a">
      <DetailsInfo :value="a" />
    </template>
  </table-listing>
</template>

<script setup>
import { ref } from 'vue'
import TableListing from '../../../components/TableListing.vue'
import DetailsInfo from './DetailsInfo.vue'
import { useRoute } from 'vue-router'
import { list, exports } from 'boot/get.js'
import { Notify, date } from 'quasar'

const route = useRoute()

const columns = [
  {
    name: 'event',
    label: 'Event',
    align: 'left',
    field: 'event',
    sortable: true,
  },
  {
    name: 'url',
    label: 'URL Accessed',
    align: 'left',
    field: 'url',
    sortable: true,
  },
  {
    name: 'updated_at',
    label: 'Updated Date Time',
    align: 'left',
    field: (row) => date.formatDate(new Date(row.updated_at), 'MMMM DD, YYYY HH:mm:ss'),
    sortable: true,
  },
  {
    name: 'ip_address',
    label: 'IP Address',
    align: 'left',
    field: 'ip_address',
    sortable: true,
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
  const result = await list(
    `audit/log?search=${filter.search || ''}&per_page=${filter.page?.rowsPerPage || 10}&page=${filter.page?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.page?.sortBy
  data.value.descending = filter.page?.descending
}

async function getExport() {
  const result = await exports(`audit/log`)
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
