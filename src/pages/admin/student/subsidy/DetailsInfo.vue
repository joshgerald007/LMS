<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Added Bill Details</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Name" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ subsidy.name }}
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
                {{ subsidy.description }}
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

const subsidy = ref({
  name: '',
  description: '',
})

onMounted(() => {
  subsidy.value.name = props.value.value.name
  subsidy.value.description = props.value.value.description
})
</script>
