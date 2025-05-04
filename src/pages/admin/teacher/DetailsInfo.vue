<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Teacher Details</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="First Name" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ teacher.first_name }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Last Name" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ teacher.last_name }}
              </div>
            </template>
          </q-field>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Email" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ teacher.email }}
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

const teacher = ref({
  first_name: '',
  last_name: '',
  email: '',
})

onMounted(() => {
  teacher.value.first_name = props.value.value.first_name
  teacher.value.last_name = props.value.value.last_name
  teacher.value.email = props.value.value.email
})
</script>
