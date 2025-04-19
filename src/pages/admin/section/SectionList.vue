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
        <q-btn
          color="primary"
          label="Add School Year"
          @click="addModal = true"
          size="sm"
          icon="add"
        />
      </template>

      <template v-slot:body-cell-isActive="props">
        <q-td :props="props">
          <div>
            <q-badge v-if="props.value === 1" color="green" label="Yes" />
            <q-badge v-else color="red" label="No" />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
          </div>
        </q-td>
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

    <q-dialog v-model="addModal">
      <create-update />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import createUpdate from './SchoolYearCreateUpdate.vue'

const addModal = ref(false)

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
    field: 'isActive',
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

const report = [
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2022-2023',
    isActive: 0,
  },
  {
    Name: '2023-2024',
    isActive: 0,
  },
  {
    Name: '2024-2025',
    isActive: 1,
  },
  {
    Name: '2025-2026',
    isActive: 0,
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
</style>
