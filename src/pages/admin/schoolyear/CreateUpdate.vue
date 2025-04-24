<template>
  <q-card style="width: 80vw">
    <q-card-section>
      <div class="text-h6">{{ AddorEdit }} School Year</div>
    </q-card-section>

    <q-separator />

    <q-card class="q-py-md">
      <q-item>
        <q-item-section justify-center>
          <q-input outlined dense label="Name" v-model="schoolyear.name" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-input
            outlined
            dense
            label="Description"
            type="textarea"
            v-model="schoolyear.description"
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section justify-center>
          <q-select
            outlined
            dense
            label="Is Active"
            emit-value
            map-options
            :options="[
              { label: 'Yes', value: 1 },
              { label: 'No', value: 0 },
            ]"
            v-model="schoolyear.is_active"
          />
        </q-item-section>
      </q-item>
    </q-card>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Submit" color="primary" @click="submit()" class="text-white" />
      <q-btn flat label="Close" color="primary" v-close-popup class="text-white" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { edit } from 'boot/put.js'

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
})

const AddorEdit = computed(() => {
  if (props.value.value.id) {
    return 'Edit'
  }

  return 'Add'
})

const schoolyear = ref({
  name: '',
  description: '',
  is_active: 1,
})

async function submit() {
  const result = await edit('school-years', schoolyear.value)
  console.log(result)
}

onMounted(() => {
  if (AddorEdit.value === 'Edit') {
    schoolyear.value.name = props.value.value.name
    schoolyear.value.description = props.value.value.description
    schoolyear.value.is_active = props.value.value.is_active
  }
})
</script>
