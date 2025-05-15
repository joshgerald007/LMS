<template>
  <q-page style="min-height: 200px">
    <q-table
      flat
      bordered
      row-key="index"
      :rows="props.data?.data || []"
      :columns="props.columns"
      class="my-sticky-table"
      v-model:pagination="paging"
      :loading="props.loading"
      @request="searchData"
      ref="tableRef"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="q-table__control col">
          <q-input
            outlined
            dense
            style="width: 180px; margin-right: 20px; min-width: 180px"
            label="Search"
            v-model="searchValue"
            @keyup.enter="searchData()"
          >
            <q-menu
              @click.stop
              persistent
              anchor="bottom left"
              self="top left"
              v-if="filteringShow"
            >
              <q-card class="q-py-xs" style="width: 300px">
                <slot name="advance-filter" :value="selectedValue"></slot>

                <q-item>
                  <q-item-section justify-center>
                    <q-input
                      clearable
                      @clear="daterange_filter = null"
                      outlined
                      dense
                      :model-value="
                        daterange_filter ? `${daterange_filter.from} - ${daterange_filter.to}` : ''
                      "
                      label="Created Date"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="daterange_filter" range>
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-btn
                    size="sm"
                    dense
                    style="height: 25px"
                    color="primary"
                    class="q-px-sm"
                    @click="filteringShow = false"
                  >
                    Close
                  </q-btn>
                  <q-btn
                    @click="clearFilter()"
                    size="sm"
                    dense
                    style="height: 25px"
                    color="warning"
                    class="q-ml-sm q-px-sm"
                    text-color="black"
                    >Clear</q-btn
                  >
                </q-item>
              </q-card>
            </q-menu>
            <template v-slot:prepend>
              <q-icon name="mdi-filter-variant" @click="filteringShow = true" />
            </template>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-field
            outlined
            dense
            style="width: 180px; margin-right: 20px; min-width: 180px"
            label="Crated Date"
            model-value="''"
            readonly
            v-if="daterange_filter"
          >
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ daterange_filter ? `${daterange_filter.from} - ${daterange_filter.to}` : '' }}
              </div>
            </template>
          </q-field>

          <template v-for="(a, k) in advfilter" :key="k">
            <q-field
              outlined
              dense
              style="width: 180px; margin-right: 20px; min-width: 180px"
              :label="k === 'is_active' ? 'Status' : k"
              model-value="''"
              readonly
              v-if="a"
            >
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">
                  {{ k === 'is_active' ? (a ? 'Active' : 'Inactive') : a }}
                </div>
              </template>
            </q-field>
          </template>

          <q-btn style="width: 80px" dense color="primary" label="Search" @click="searchData()" />
        </div>

        <div class="q-table__control">
          <q-btn
            color="primary"
            label="Download Excel"
            class="q-mr-md"
            @click="emit('getExport')"
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
          <q-btn
            v-if="!!slots['generate-modal']"
            color="primary"
            :label="`Generate ${props.name}`"
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
            <q-td
              v-else
              v-bind:style="!!slots['custom-action'] ? { width: '480px' } : { width: '350px' }"
            >
              <q-btn
                v-if="!!slots['details-info-modal']"
                color="info"
                label="Details"
                class="q-mr-md"
                @click="toDetails(props.row)"
                size="sm"
                icon="mdi-file-document-outline"
              />
              <q-btn
                v-if="!!slots['create-update-modal']"
                color="warning text-black"
                label="Edit"
                class="q-mr-md"
                @click="toEdit(props.row)"
                size="sm"
                icon="edit_square"
              />
              <q-btn
                v-if="!!slots['confirm-delete-modal']"
                color="red"
                label="Delete"
                class="q-mr-md"
                size="sm"
                icon="delete"
                @click="toDelete(props.row)"
              />

              <slot name="custom-action" :value="props.row"></slot>
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="cuModal" persistent>
      <slot name="create-update-modal" :value="selectedValue" :closeModal="closeModal"></slot>
    </q-dialog>
    <q-dialog v-model="cuModal" persistent>
      <slot name="generate-modal" :value="selectedValue" :closeModal="closeModal"></slot>
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
import { ref, useSlots, defineExpose, computed, onMounted } from 'vue'
import { date } from 'quasar'

const slots = useSlots()

const cuModal = ref(false)
const diModal = ref(false)
const confirmModal = ref(false)

const selectedValue = ref()
const searchValue = ref()

const tableRef = ref()

const filteringShow = ref(false)

const daterange_filter = ref(null)

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Object,
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
  advfilter: {
    type: Object,
    required: false,
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

function clearFilter() {
  daterange_filter.value = null
  emit('clearFilter')
}

const paging = computed(() => {
  return {
    rowsPerPage: props.data?.per_page || 10,
    rowsNumber: props.data?.total || 0,
    page: props.data?.current_page || 1,
    sortBy: props.data?.sortBy || '',
    descending: props.data?.descending || '',
  }
})

const emit = defineEmits(['getData'])

function searchData(p = null) {
  filteringShow.value = false
  emit('getData', {
    page: p ? p.pagination : paging.value,
    search: searchValue.value,
    start: daterange_filter.value
      ? date.formatDate(new Date(daterange_filter.value.from), 'X')
      : '',
    end: daterange_filter.value ? date.formatDate(new Date(daterange_filter.value.to), 'X') : '',
  })
}

defineExpose({
  closeModal,
})

onMounted(() => {
  tableRef.value.requestServerInteraction()
})
</script>

<style lang="scss" scoped>
:deep() thead tr:first-child th,
.q-table__bottom {
  background-color: var(--q-primary);
  color: white;
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
