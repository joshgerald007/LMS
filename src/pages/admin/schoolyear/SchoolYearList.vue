<template>
  <table-listing :columns="columns" :data="data" :name="route.name">
    <template #create-update-modal="a">
      <CreateUpdate :value="a" />
    </template>
    <template #details-info-modal="a">
      <DetailsInfo :value="a" />
    </template>
  </table-listing>
</template>

<script setup>
import { ref } from 'vue'
import TableListing from '../../../components/TableListing.vue'
import CreateUpdate from './CreateUpdate.vue'
import DetailsInfo from './DetailsInfo.vue'
import { useRoute } from 'vue-router'
import { list } from 'boot/get.js'

const route = useRoute()

const columns = [
  {
    name: 'name',
    label: 'name',
    align: 'left',
    field: 'name',
    sortable: true,
  },
  {
    name: 'is_active',
    label: 'is Active',
    align: 'left',
    field: (row) => {
      if (row.is_active) {
        return { label: 'Yes', badgeColor: 'green' }
      }
      return { label: 'No', badgeColor: 'red' }
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

const data = ref([])

async function getData() {
  const result = await list('school-years')
  data.value = result?.data?.result?.data || []
}
getData()
</script>
