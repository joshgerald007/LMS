<template>
  <q-drawer
    :mini="minimize"
    :modelValue="props.open"
    show-if-above
    style="padding: 10px"
    :width="290"
    :mini-width="74"
    class="shadow-2"
  >
    <q-toolbar style="margin-top: 15px">
      <q-avatar size="32px" class="q-mb-sm">
        <img
          src="/src/assets/logo.png"
          alt="logo"
          style="cursor: pointer"
          @click="minimize = false"
        />
      </q-avatar>
      <q-toolbar-title
        class="text-weight-medium q-mb-xs"
        style="font-size: 1.3rem; letter-spacing: -0.5px"
      >
        <!-- Pinamalayan Maritime Foundation & Technological College Inc. -->
        PMFTCI
      </q-toolbar-title>
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 150px)">
      <q-list padding>
        <template v-for="l in linksList" :key="l.name">
          <q-expansion-item
            v-if="l.child"
            style="border-radius: 12px"
            expand-separator
            :icon="l.icon"
            :label="l.label"
          >
            <q-item v-for="m in l.child" :key="m.name" class="q-ml-md" clickable :href="m.link">
              <q-item-section avatar>
                <q-icon :name="m.icon" />
              </q-item-section>

              <q-item-section>
                {{ m.label }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-item v-else clickable :href="l.link">
            <q-item-section avatar>
              <q-icon :name="l.icon" />
            </q-item-section>

            <q-item-section>
              {{ l.label }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>

    <div class="q-mini-drawer-hide absolute" style="top: 30px; right: -10px">
      <q-btn
        dense
        round
        unelevated
        color="primary"
        icon="chevron_left"
        style="border: 6px solid white"
        @click="minimize = true"
      />
    </div>
  </q-drawer>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
})

const minimize = ref(false)

const linksList = [
  {
    icon: 'mdi-view-dashboard',
    label: 'Dashboard',
    name: 'Dashboard',
    separator: false,
    link: '/dashboard',
  },
  {
    icon: 'computer',
    label: 'Manage Course',
    separator: false,
    name: 'Manage Course',
    child: [
      {
        icon: 'mdi-calendar-month',
        label: 'School Year',
        name: 'School Year',
        separator: false,
        link: '/admin/schoolyear',
      },
      {
        icon: 'mdi-calendar-clock-outline',
        label: 'Semester',
        name: 'Semester',
        separator: false,
        link: '/admin/semester',
      },
      {
        icon: 'mdi-bookshelf',
        label: 'Course',
        name: 'Course',
        separator: false,
        link: '/admin/course',
      },
      {
        icon: 'meeting_room',
        label: 'Section',
        name: 'Section',
        separator: false,
        link: '/admin/section',
      },
      {
        icon: 'library_books',
        label: 'Subject',
        name: 'Subject',
        separator: false,
        link: '/admin/subject',
      },
      {
        icon: 'mdi-human-male-board',
        label: 'Teacher',
        name: 'Teacher',
        separator: false,
        link: '/admin/teacher',
      },
      {
        icon: 'mdi-book-clock',
        label: 'Schedule',
        name: 'Schedule',
        separator: false,
        link: '/admin/schedule',
      },
    ],
  },
  {
    icon: 'mdi-account-group',
    label: 'Faculty',
    name: 'Faculty',
    separator: false,
    link: '/admin/faculty',
  },
  {
    icon: 'mdi-account-group',
    label: 'User',
    name: 'User',
    separator: false,
    link: '/user',
  },
]
</script>
