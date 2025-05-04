const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'admin', name: 'Index', component: () => import('pages/admin/IndexPage.vue') },
      {
        path: '/admin/login',
        name: 'Admin Login',
        component: import('pages/admin/LoginPage.vue'),
      },
      {
        path: '/admin/forgotpassword',
        name: 'Forgot Password',
        component: import('pages/admin/ForgotPassword.vue'),
      },
      {
        path: '/admin/schoolyear',
        name: 'School Year',
        component: import('pages/admin/schoolyear/SchoolYearList.vue'),
      },
      {
        path: '/admin/semester',
        name: 'Semester',
        component: import('pages/admin/semester/SemesterList.vue'),
      },
      {
        path: '/admin/course',
        name: 'Course',
        component: import('pages/admin/course/CourseList.vue'),
      },
      {
        path: '/admin/section',
        name: 'Section',
        component: import('pages/admin/section/SectionList.vue'),
      },
      {
        path: '/admin/room',
        name: 'Room',
        component: import('pages/admin/room/RoomList.vue'),
      },
      {
        path: '/admin/subject',
        name: 'Subject',
        component: import('pages/admin/subject/SubjectList.vue'),
      },
      {
        path: '/admin/teacher',
        name: 'Teacher',
        component: import('pages/admin/teacher/TeacherList.vue'),
      },
      {
        path: '/admin/faculty',
        name: 'Faculty',
        component: import('pages/admin/faculty/FacultyList.vue'),
      },
      {
        path: '/admin/schedule',
        name: 'Schedule ',
        component: import('pages/admin/schedule/ScheduleList.vue'),
      },
      {
        path: '/admin/schedule/:id',
        name: 'Schedule',
        component: import('pages/admin/schedule/ScheduleList.vue'),
      },
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
