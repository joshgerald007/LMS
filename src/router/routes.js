const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'admin', name: 'Index', component: () => import('pages/admin/IndexPage.vue') },
      {
        path: '/admin/student',
        name: 'Admin Student',
        component: import('pages/admin/student/StudentList.vue'),
      },
      {
        path: '/admin/program',
        name: 'Admin Program',
        component: import('pages/admin/program/ProgramList.vue'),
      },
      {
        path: '/admin/section',
        name: 'Admin Section',
        component: import('pages/admin/section/SectionList.vue'),
      },
      {
        path: '/admin/subject',
        name: 'Admin Subject',
        component: import('pages/admin/subject/SubjectList.vue'),
      },
<<<<<<< Updated upstream
=======
      {
        path: '/admin/teacher',
        name: 'Teacher',
        component: import('pages/admin/teacher/TeacherList.vue'),
      },
      {
        path: '/admin/schedule',
        name: 'Schedule',
        component: import('pages/admin/schedule/ScheduleList.vue'),
      },
      {
        path: '/admin/faculty',
        name: 'Faculty',
        component: import('pages/admin/faculty/FacultyList.vue'),
      },
>>>>>>> Stashed changes
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
