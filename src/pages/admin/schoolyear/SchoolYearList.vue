<template>
  <table-listing :columns="columns" :data="data" :name="route.name">
    <template #create-update-modal="a">
      <CreateUpdate :value="a" />
    </template>
  </table-listing>
</template>

<script setup>
import { ref } from 'vue'
import TableListing from '../../../components/TableListing.vue'
import CreateUpdate from './CreateUpdate.vue'
import { useRoute } from 'vue-router'
import { loadData } from 'boot/request.js'

const route = useRoute()

const columns = [
  {
    name: 'Name',
    label: 'Name',
    align: 'left',
    field: 'Name',
    sortable: true,
  },
  {
    name: 'isActive',
    label: 'is Active',
    align: 'left',
    field: (row) => {
      if (row.isActive) {
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
  data.value = await loadData('berry')
}
getData()
</script>
