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
        title="Program"
        :rows="rows"
        :columns="columns"
      />
    </div>
  </q-page>
</template>

<script setup>
const columns = [
  {
    name: 'Code',
    label: 'Code',
    align: 'left',
    field: 'Code',
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
    name: 'Action',
    label: 'Action',
    align: 'left',
    field: 'Action',
    sortable: true,
  },
]

const seed = [
  {
    Code: 'BSIT',
    Name: 'Bachelor of Science in Information Technology',
  },
  {
    Code: 'BSAIS',
    Name: '	Bachelor of Science in Accounting Information System',
  },
  {
    Code: 'BSBA',
    Name: 'Bachelor of Science in Business Administration',
  },
  {
    Code: 'BSIT',
    Name: 'Bachelor of Science in Information Technology',
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
