<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Course Details</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Code" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ course.code }}</div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Name" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{ course.name }}</div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Faculty" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ course.faculty }}
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
                {{ course.description }}
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
                <q-badge color="green" label="Active" v-if="course.is_active" />
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

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const course = ref({
  name: '',
  description: '',
  is_active: 1,
})

onMounted(() => {
  course.value.code = props.value.value.code
  course.value.name = props.value.value.name
  course.value.description = props.value.value.description
  course.value.faculty = props.value.value.faculty.name
  course.value.is_active = props.value.value.is_active
})
</script>
