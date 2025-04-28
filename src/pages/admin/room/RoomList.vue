<template>
  <table-listing
    :columns="columns"
    :data="data"
    :name="route.name"
    :loading="loading"
    ref="tl"
    @getData="getData"
    @getExport="getExport"
  >
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
          <span class="q-ml-sm">Are you sure you want to delete this room?</span>
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
import TableListing from '../../../components/TableListing.vue'
import CreateUpdate from './CreateUpdate.vue'
import DetailsInfo from './DetailsInfo.vue'
import { useRoute } from 'vue-router'
import { list, exports } from 'boot/get.js'
import { del } from 'boot/delete.js'
import { Loading } from 'quasar'

const route = useRoute()

const columns = [
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
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
    sortable: true,
  },
]

const tl = ref(null)

async function deleteItem(id) {
  Loading.show()
  const result = await del('course', id)
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
  }

  loading.value = true
  const result = await list(
    `rooms?search=${filter.search || ''}&per_page=${filter.page?.rowsPerPage || 10}&page=${filter.page?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.page?.sortBy
  data.value.descending = filter.page?.descending
}

async function getExport() {
  const result = await exports(`rooms`)
  console.log(result)
}
</script>
