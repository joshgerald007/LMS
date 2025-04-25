<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Semester Details</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Name" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ semester.name }}</div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="School Year" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ semester.year_start }} - {{ semester.year_end }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Start Date" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ date.formatDate(new Date(semester.start_date), 'MMMM DD,YYYY') }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="End Date" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ date.formatDate(new Date(semester.end_date), 'MMMM DD,YYYY') }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Description" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ semester.description }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Status" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                <q-badge color="green" label="Active" v-if="semester.is_active" />
                <q-badge color="red" label="Inactive" v-else />
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
    </q-card>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup class="text-white" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { date } from 'quasar'

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const semester = ref({
  name: '',
  description: '',
  is_active: 1,
})

onMounted(() => {
  semester.value.name = props.value.value.name
  semester.value.description = props.value.value.description
  semester.value.year_start = props.value.value.year_start
  semester.value.year_end = props.value.value.year_end
  semester.value.start_date = props.value.value.start_date
  semester.value.end_date = props.value.value.end_date
  semester.value.is_active = props.value.value.is_active
})
</script>
