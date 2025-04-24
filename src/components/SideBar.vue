<template>
  <q-drawer
    :mini="props.open"
    show-if-above
    :width="250"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-tab-panels v-model="panel" animated class="bg-transparent">
        <q-tab-panel name="main" class="no-padding">
          <q-list>
            <template v-for="(linkItem, index) in linksList" :key="index">
              <q-item
                clickable
                @click="mainMenuClick(linkItem)"
                :href="linkItem.link"
                active-class="my-menu-link"
                v-ripple
              >
                <q-item-section avatar>
                  <q-icon :name="linkItem.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  {{ linkItem.label }}
                </q-item-section>
                <q-item-section avatar v-if="linkItem.child">
                  <q-icon name="chevron_right"></q-icon>
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="linkItem.separator"></q-separator>
            </template>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="sub" class="no-padding">
          <q-list>
            <q-item clickable @click="panel = 'main'" v-ripple>
              <q-item-section avatar>
                <q-icon name="chevron_left"></q-icon>
              </q-item-section>
              <q-item-section> {{ panelName }} </q-item-section>
            </q-item>
            <q-separator></q-separator>
            <template
              v-for="(subItem, subIndex) in linksList.find((x) => x.name === panelName).child"
              :key="subIndex"
            >
              <q-item clickable :href="subItem.link" active-class="my-menu-link" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="subItem.icon"></q-icon>
                </q-item-section>
                <q-item-section> {{ subItem.label }} </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-scroll-area>
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

const linksList = [
  {
    icon: 'mdi-view-dashboard',
    label: 'Dashboard',
    name: 'Dashboard',
    separator: false,
    link: '/dashboard',
  },
  {
    icon: 'mdi-invoice-text-clock',
    label: 'Attendance',
    name: 'Attendance',
    separator: false,
    link: '/dashboard',
  },
  {
    icon: 'computer',
    label: 'Master Records',
    separator: false,
    name: 'Master Records',
    child: [
      {
        icon: 'mdi-bookshelf',
        label: 'Course',
        name: 'Course',
        separator: false,
        link: '/admin/program',
      },
      {
        icon: 'meeting_room',
        label: 'Section',
        name: 'Course',
        separator: false,
        link: '/admin/section',
      },
      {
        icon: 'library_books',
        label: 'Subject',
        name: 'Course',
        separator: false,
        link: '/admin/subject',
      },
    ],
  },
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
]

const panel = ref('main')
const panelName = ref('')
const link = ref('inbox')

function mainMenuClick(mItem) {
  link.value = mItem.label
  if (mItem.child) {
    panel.value = 'sub'
    panelName.value = mItem.name
  }
}
</script>
