<template>
  <div class="q-pb-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Home" />
      <q-breadcrumbs-el label="Student" />
      <q-breadcrumbs-el label="Student" />
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
    <template #custom-action="a">
      <q-btn
        label="Schedule"
        color="green"
        class="q-mr-md"
        size="sm"
        icon="mdi-format-list-text"
        @click="router.push({ path: `/admin/schedule/student/${a.value.id}` })"
      ></q-btn>
      <q-btn
        label="Payment"
        color="blue"
        class="q-mr-md"
        size="sm"
        icon="mdi-printer-pos"
        @click="router.push({ path: `/admin/payment/student/${a.value.id}` })"
      ></q-btn>
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
          <span class="q-ml-sm">Are you sure you want to delete this student?</span>
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
import { useRoute, useRouter } from 'vue-router'
import { list, exports } from 'boot/get.js'
import { del } from 'boot/delete.js'
import { Loading, Notify } from 'quasar'

const route = useRoute()
const router = useRouter()

const columns = [
  {
    name: 'first_name',
    label: 'First Name',
    align: 'left',
    field: 'first_name',
    sortable: true,
  },
  {
    name: 'last_name',
    label: 'Last Name',
    align: 'left',
    field: 'last_name',
    sortable: true,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
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

async function deleteItem(id) {
  Loading.show()
  const result = await del('student', id)
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
  const result = await list(
    `student?search=${filter.search || ''}&per_page=${filter.page?.rowsPerPage || 10}&page=${filter.page?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.page?.sortBy
  data.value.descending = filter.page?.descending
}

async function getExport() {
  const result = await exports(`student`)
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
