<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-virtscroll-table"
        virtual-scroll
        flat
        bordered
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        :virtual-scroll-sticky-size-start="48"
        row-key="index"
        title="Students"
        :rows="rows"
        :columns="columns"
      />
    </div>
  </q-page>
</template>

<script setup>
import { date } from 'quasar'

const columns = [
  {
    name: 'StudentID',
    label: 'Course ID',
    align: 'left',
    field: 'StudentID',
    sortable: true,
  },
  {
    name: 'Name',
    label: 'Name',
    align: 'left',
    field: 'Name',
    sortable: true,
  },
  {
    name: 'Gender',
    align: 'left',
    label: 'Gender',
    field: (row) => (row.Gender === 'M' ? 'Male' : 'Female'),
    sortable: true,
  },
  {
    name: 'Birthdate',
    align: 'left',
    label: 'Birthdate',
    field: (row) => date.formatDate(row.Birthdate, 'MMMM DD,YYYY'),
    sortable: true,
  },
  {
    name: 'Age',
    align: 'left',
    label: 'Age',
    field: (row) => date.getDateDiff(new Date(), row.Birthdate, 'years'),
    sortable: true,
  },
  {
    name: 'Course',
    align: 'left',
    label: 'Course',
    field: 'Course',
    sortable: true,
  },
  {
    name: 'Year',
    align: 'left',
    label: 'Year',
    field: (row) => `${numberPlace(row.Year)} Year`,
    sortable: true,
  },
  {
    name: 'Section',
    align: 'left',
    label: 'Section',
    field: 'Section',
    sortable: true,
  },
]

function numberPlace(n) {
  if (n === 1) {
    return '1st'
  }

  if (n === 2) {
    return '2nd'
  }

  if (n === 3) {
    return '3rd'
  }

  return `${n}th`
}

const seed = [
  {
    StudentID: '00001',
    Name: 'Josh Gerald Gugol',
    Gender: 'M',
    Birthdate: '1991-11-07',
    Course: 'BS Computer Science',
    Year: 3,
    Section: 'BSCS-101',
  },
  {
    StudentID: '00002',
    Name: 'Apollo Malapote',
    Gender: 'M',
    Birthdate: '1991-11-07',
    Course: 'BS Information Technology',
    Year: 4,
    Section: 'BSCS-403',
  },
  {
    StudentID: '00003',
    Name: 'Edbert Guinto',
    Gender: 'M',
    Birthdate: '1991-11-07',
    Course: 'BS Computer Science',
    Year: 2,
    Section: 'BSCS-101',
  },
  {
    StudentID: '00004',
    Name: 'Rica Flores',
    Gender: 'F',
    Birthdate: '1991-11-07',
    Course: 'BS Computer Science',
    Year: 3,
    Section: 'BSCS-101',
  },
  {
    StudentID: '00005',
    Name: 'Donnie Ray Sadim',
    Gender: 'F',
    Birthdate: '1991-11-07',
    Course: 'BS Computer Science',
    Year: 3,
    Section: 'BSCS-101',
  },
  {
    StudentID: '00006',
    Name: 'Anica Zoe Gugol',
    Gender: 'F',
    Birthdate: '1991-11-07',
    Course: 'BS Computer Science',
    Year: 3,
    Section: 'BSCS-101',
  },
]

// we generate lots of rows here
let rows = []
for (let i = 0; i < 1000; i++) {
  rows = rows.concat(seed.slice(0).map((r) => ({ ...r })))
}
rows.forEach((row, index) => {
  row.index = index
})
</script>

<style scoped lang="scss">
.my-sticky-virtscroll-table {
  height: 410px;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: #00b4ff;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:last-child th {
    top: 48px;
  }

  thead tr:first-child th {
    top: 0;
  }

  tbody {
    scroll-margin-top: 48px;
  }
}
</style>
