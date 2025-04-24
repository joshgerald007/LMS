<template>
  <q-page style="min-height: 200px">
    <q-table
      flat
      bordered
      row-key="index"
      :rows="report"
      :columns="columns"
      class="my-sticky-table"
    >
      <template v-slot:top>
        <q-input
          filled
          class="col-4"
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <q-btn
          color="primary"
          label="Download Excel"
          class="q-mr-md"
          @click="addRow"
          size="sm"
          icon="download"
        />
        <q-btn color="primary" label="Add Course" @click="addRow" size="sm" icon="add" />
      </template>

      <template v-slot:body-cell-Actions="props">
        <q-td :props="props" style="width: 250px">
          <q-btn
            color="warning text-black"
            label="Edit"
            class="q-mr-md"
            @click="addRow"
            size="sm"
            icon="edit_square"
          />
          <q-btn
            color="red"
            label="Delete"
            class="q-mr-md"
            @click="addRow"
            size="sm"
            icon="delete"
          />
        </q-td>
      </template>
    </q-table>
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
    name: 'Actions',
    label: 'Actions',
    align: 'left',
    field: 'Actions',
    sortable: true,
  },
]

const report = [
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
</script>

<style lang="scss">
thead tr:first-child th,
.q-table__bottom {
  background-color: var(--q-primary);
}

.my-sticky-table {
  height: auto;
  max-height: calc(100vh - 200px);

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    background-color: var(-q--primary);
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

.body--light {
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th,
  .q-field__native,
  .q-field__prefix,
  .q-field__suffix,
  .q-field__input,
  .q-field__marginal {
    color: white;
  }
}
</style>
