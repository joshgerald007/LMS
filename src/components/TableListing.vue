<template>
  <q-page style="min-height: 200px">
    <q-table
      flat
      bordered
      row-key="index"
      :rows="props.data"
      :columns="props.columns"
      class="my-sticky-table"
      :pagination="{
        rowsPerPage: 1000,
      }"
      :loading="props.loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="q-table__control col">
          <q-input
            outlined
            dense
            style="width: calc(50% - 70px); margin-right: 20px; min-width: 180px"
            label="Search"
            v-model="searchValue"
            @keyup.enter="searchData()"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-input
            outlined
            dense
            :model-value="`${dateRange.from} - ${dateRange.to}`"
            style="width: calc(50% - 90px); margin-right: 20px; min-width: 180px"
            :disable="!searchByDate"
          >
            <template v-slot:prepend>
              <q-icon
                name="mdi-checkbox-marked-outline"
                v-if="searchByDate"
                class="cursor-pointer"
                @click="searchByDate = false"
              />
              <q-icon
                name="mdi-checkbox-blank-outline"
                v-else
                class="cursor-pointer"
                @click="searchByDate = true"
              />
            </template>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  v-if="searchByDate"
                >
                  <q-date v-model="dateRange" range>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-btn style="width: 80px" color="primary" label="Search" @click="searchData()" />
        </div>

        <div class="q-table__separator col"></div>

        <div class="q-table__control">
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
        </div>
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
            <q-td v-else style="width: 350px">
              <q-btn
                color="info"
                label="Details"
                class="q-mr-md"
                @click="toDetails(props.row)"
                size="sm"
                icon="mdi-file-document-outline"
              />
              <q-btn
                color="warning text-black"
                label="Edit"
                class="q-mr-md"
                @click="toEdit(props.row)"
                size="sm"
                icon="edit_square"
              />
              <q-btn
                color="red"
                label="Delete"
                class="q-mr-md"
                size="sm"
                icon="delete"
                @click="toDelete(props.row)"
              />
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="cuModal" persistent>
      <slot name="create-update-modal" :value="selectedValue" :closeModal="closeModal"></slot>
    </q-dialog>
    <q-dialog v-model="diModal" persistent>
      <slot name="details-info-modal" :value="selectedValue"></slot>
    </q-dialog>
    <q-dialog v-model="confirmModal" persistent>
      <slot name="confirm-delete-modal" :value="selectedValue" :closeModal="closeModal"></slot>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, useSlots, defineExpose } from 'vue'
import { date } from 'quasar'

const slots = useSlots()

const cuModal = ref(false)
const diModal = ref(false)
const confirmModal = ref(false)

const selectedValue = ref()
const searchValue = ref()

const dateRange = ref({
  from: date.formatDate(new Date(), 'YYYY/MM/DD'),
  to: date.formatDate(new Date(), 'YYYY/MM/DD'),
})
const searchByDate = ref(false)

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
  loading: {
    type: Boolean,
    required: true,
  },
})

function toAdd() {
  cuModal.value = true
  selectedValue.value = {}
}

function toEdit(v) {
  cuModal.value = true
  selectedValue.value = v
}

function toDetails(v) {
  diModal.value = true
  selectedValue.value = v
}

function toDelete(v) {
  confirmModal.value = true
  selectedValue.value = v
}

function closeModal() {
  cuModal.value = false
  diModal.value = false
  confirmModal.value = false
}

const emit = defineEmits(['getData'])

function searchData() {
  emit('getData', {
    search: searchValue.value,
    start: searchByDate.value ? date.formatDate(new Date(dateRange.value.from), 'X') : '',
    end: searchByDate.value ? date.formatDate(new Date(dateRange.value.to), 'X') : '',
  })
}

defineExpose({
  closeModal,
})
</script>

<style lang="scss" scoped>
:deep() thead tr:first-child th,
.q-table__bottom {
  background-color: var(--q-primary);
}

:deep() .my-sticky-table {
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

  .on-left {
    margin-right: 5px;
  }
}

:deep() .q-field--disabled .q-field__control {
  pointer-events: auto;
}
</style>
