<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">OR Number Details</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-field outlined label="Number" stack-label readonly>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ ornumber.number }}
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
                {{ ornumber.status }}
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

const ornumber = ref({
  number: '',
  status: '',
})

onMounted(() => {
  ornumber.value.number = props.value.value.number
  ornumber.value.status = props.value.value.status
})
</script>
