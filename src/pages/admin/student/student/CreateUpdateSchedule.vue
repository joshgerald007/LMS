<template>
  <q-card class="my-card" flat bordered>
    <q-card-section>
      <div class="text-h6">Schedule Selection</div>
    </q-card-section>
    <q-table
      flat
      bordered
      row-key="id"
      :rows="data?.data || []"
      :columns="columns"
      class="my-sticky-table"
      v-model:pagination="paging"
      :loading="loading"
      @request="getschedule"
      ref="tableRef"
      selection="multiple"
      v-model:selected="selected"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <h5 class="q-my-sm q-ml-sm">List of Schedule</h5>
        <div class="q-table__control col">
          <q-input
            outlined
            dense
            style="width: 180px; margin-right: 20px; min-width: 180px"
            label="Search"
            v-model="searchValue"
            @keyup.enter="getschedule()"
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

          <q-btn style="width: 80px" dense color="primary" label="Search" @click="getschedule()" />
        </div>
      </template>
    </q-table>

    <q-table
      flat
      bordered
      row-key="index"
      :rows="selected"
      :columns="columns"
      class="my-sticky-table"
      ref="tableRef"
      :hide-bottom="selected.length > 0"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>

      <template v-slot:top>
        <h5 class="q-my-sm q-ml-sm">List of Selected Schedule</h5>
      </template>
    </q-table>
    <q-btn
      @click="submitSchedule()"
      label="Submit"
      color="green"
      class="q-ma-md"
      size="sm"
      icon="check"
      v-if="selected.length > 0"
    ></q-btn>
  </q-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { list } from 'boot/get.js'
import { add } from 'boot/post.js'
import { Notify, Loading } from 'quasar'

const route = useRoute()

const filteringShow = ref(false)

const daterange_filter = ref(null)
const searchValue = ref()
const selected = ref([])
let data = ref()

const columns = [
  {
    name: 'room',
    label: 'Room',
    align: 'left',
    field: (row) => row.room.name,
    sortable: true,
  },
  {
    name: 'section',
    label: 'Section',
    align: 'left',
    field: (row) => row.section.name,
    sortable: true,
  },
  {
    name: 'teacher',
    label: 'Teacher',
    align: 'left',
    field: (row) => `${row.teacher.first_name} ${row.teacher.last_name}`,
    sortable: true,
  },
  {
    name: 'day',
    label: 'Day',
    align: 'left',
    field: 'day_of_week',
    sortable: true,
  },
  {
    name: 'start_time',
    label: 'Start Time',
    align: 'left',
    field: 'start_time',
    sortable: true,
  },
  {
    name: 'end_time',
    label: 'End Time',
    align: 'left',
    field: 'end_time',
    sortable: true,
  },
]

const paging = computed(() => {
  return {
    rowsPerPage: data.value?.per_page || 10,
    rowsNumber: data.value?.total || 0,
    page: data.value?.current_page || 1,
    sortBy: data.value?.sortBy || '',
    descending: data.value?.descending || '',
  }
})

const loading = ref(false)

const adv_filter = ref({
  is_active: '',
})

async function getschedule(filter = {}) {
  let start = ''
  let end = ''
  let sBy = ''
  let oBy = ''
  if (filter.start) {
    start = `&start=${filter.start}`
  }
  if (filter.end) {
    end = `&end=${filter.end}`
  }

  if (filter?.pagination?.sortBy) {
    sBy = `&order_by=${filter.page.sortBy}`
    oBy = `&direction=${filter.page.descending ? 'asc' : 'desc'}`
  }

  let path = ''
  path = 'schedules/subject-schedule/get/subject'

  loading.value = true
  const isactive = adv_filter.value.is_active ? `&is_active=${adv_filter.value.is_active}` : ''
  const result = await list(
    `${path}?search=${filter.search || ''}${isactive}&per_page=${filter.pagination?.rowsPerPage || 10}&page=${filter.pagination?.page || 1}${start}${end}${sBy}${oBy}`,
  )
  loading.value = false
  data.value = result?.data?.result || []
  data.value.sortBy = filter.pagination?.sortBy
  data.value.descending = filter.pagination?.descending
  data.value.per_page = filter.pagination?.rowsPerPage
}

const emit = defineEmits(['getData'])

async function submitSchedule() {
  Loading.show()
  const param = {
    schedule_id: selected.value.map((x) => x.id),
    student_id: route.params.id,
  }

  const result = await add('student-schedule', param)

  if (result.status === 200) {
    Notify.create({
      message: 'Successfully add a school year',
      position: 'top-right',
      color: 'green',
      timeout: 2000,
    })
    emit('getData')
  } else {
    Notify.create({
      message: result.data.message,
      position: 'top-right',
      color: 'red',
      timeout: 2000,
    })
  }
  Loading.hide()
}

onMounted(() => {
  getschedule()
})
</script>

<style lang="scss" scoped>
:deep() .q-table__top {
  display: inline;
}
</style>
