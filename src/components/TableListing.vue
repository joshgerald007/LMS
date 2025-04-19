<template>
  <q-page style="min-height: 200px">
    <q-table
      flat
      bordered
      row-key="index"
      :rows="props.data"
      :columns="props.columns"
      class="my-sticky-table"
    >
      <template v-slot:top>
        <q-input filled class="col-4" borderless dense debounce="300" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <q-btn
          color="primary"
          label="Download Excel"
          class="q-mr-md"
          @click="toAdd()"
          size="sm"
          icon="download"
        />
        <q-btn
          v-if="!!slots['create-update-modal']"
          color="primary"
          :label="`Add ${props.name}`"
          @click="toAdd()"
          size="sm"
          icon="add"
        />
      </template>

      <template v-slot:body="props">
        <q-tr>
          <template v-for="f in props.cols.map((x) => x.name)" :key="f">
            <q-td v-if="f !== 'Actions'">
              <template v-if="props.cols.find((x) => x.name === f).tag === 'badge'">
                <q-badge
                  :color="props.cols.find((x) => x.name === f).value.badgeColor"
                  :label="props.cols.find((x) => x.name === f).value.label"
                />
              </template>
              <template v-else>
                {{ props.cols.find((x) => x.name === f).value }}
              </template>
            </q-td>
            <q-td v-else style="width: 250px">
              <q-btn
                color="warning text-black"
                label="Edit"
                class="q-mr-md"
                @click="toEdit(props.row)"
                size="sm"
                icon="edit_square"
              />
              <q-btn color="red" label="Delete" class="q-mr-md" size="sm" icon="delete" />
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="cuModal">
      <slot name="create-update-modal" :value="cuValue"></slot>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, useSlots } from 'vue'

const slots = useSlots()

const cuModal = ref(false)

const cuValue = ref({})

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

function toAdd() {
  cuModal.value = true
  cuValue.value = {}
}

function toEdit(v) {
  cuModal.value = true
  cuValue.value = v
}
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
