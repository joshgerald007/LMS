<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">Add School Year {{ props }}</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Is Active" />
        </q-item-section>
      </q-item>
    </q-card>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Submit" color="primary" v-close-popup />
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})
</script>
