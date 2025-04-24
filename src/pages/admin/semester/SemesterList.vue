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
import { list } from 'boot/get.js'
// import { date } from 'quasar'

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
    name: 'term',
    label: 'term',
    align: 'left',
    field: 'term',
    sortable: true,
  },
  {
    name: 'SchoolYear',
    label: 'School Year',
    align: 'left',
    field: (row) => {
      // let sDate = new Date(row.start_date)
      // let eDate = new Date(row.end_date)

      return `${row.year_start} - ${row.year_end}`
    },
    sortable: true,
  },
  {
    name: 'EvaluationStartDate',
    label: 'Evaluation Date',
    align: 'left',
    field: (row) => {
      // let sDate = new Date(row.start_date)
      // let eDate = new Date(row.end_date)

      return `${row.start_date} - ${row.end_date}`
    },
    sortable: true,
  },
  {
    name: 'is_active',
    label: 'is Active',
    align: 'left',
    field: 'is_active',
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

const data = ref([])

async function getData() {
  data.value = await list('semesters')
}
getData()
</script>
