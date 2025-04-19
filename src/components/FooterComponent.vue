<template>
  <q-footer elevated>
    <div class="q-ml-sm">
      {{ copyrightNotice }} <a href="" class="float-right q-mr-md text-white">LinkedIn</a>
    </div>
  </q-footer>
</template>

<script setup>
import { ref } from 'vue'

const copyrightNotice = ref(
  `Copyright © ${new Date().getFullYear()} Iguanaxe Software Laboratory OPC. All rights reserved.`,
)
</script>
