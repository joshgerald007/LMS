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
        component: import('pages/admin/course/schoolyear/SchoolYearList.vue'),
      },
      {
        path: '/admin/semester',
        name: 'Semester',
        component: import('pages/admin/course/semester/SemesterList.vue'),
      },
      {
        path: '/admin/course',
        name: 'Course',
        component: import('pages/admin/course/course/CourseList.vue'),
      },
      {
        path: '/admin/section',
        name: 'Section',
        component: import('pages/admin/course/section/SectionList.vue'),
      },
      {
        path: '/admin/room',
        name: 'Room',
        component: import('pages/admin/course/room/RoomList.vue'),
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
        name: 'Schedule',
        component: import('pages/admin/schedule/ScheduleList.vue'),
      },
      {
        path: '/admin/schedule/subject/:id',
        name: 'Subject Schedule',
        component: import('pages/admin/schedule/ScheduleList.vue'),
      },
      {
        path: '/admin/schedule/student/:id',
        name: 'Student Schedule',
        component: import('pages/admin/student/student/ScheduleList.vue'),
      },
      {
        path: '/admin/finance/addedbill',
        name: 'Added Bill',
        component: import('pages/admin/finance/addedbill/AddedBillList.vue'),
      },
      {
        path: '/admin/finance/otherpayment',
        name: 'Other Payment',
        component: import('pages/admin/finance/otherpayment/OtherPaymentList.vue'),
      },
      {
        path: '/admin/finance/pettycash',
        name: 'Petty Cash',
        component: import('pages/admin/finance/pettycash/PettyCashList.vue'),
      },
      {
        path: '/admin/finance/pettycash/transaction/:id',
        name: 'Petty Cash Transaction',
        component: import('pages/admin/finance/pettycashtransaction/PettyCashTransactionList.vue'),
      },
      {
        path: '/admin/student/student',
        name: 'Student',
        component: import('pages/admin/student/student/StudentList.vue'),
      },
      {
        path: '/admin/student/scholarship',
        name: 'Scholarship',
        component: import('pages/admin/student/scholarship/ScholarshipList.vue'),
      },
      {
        path: '/admin/student/subsidy',
        name: 'Subsidy',
        component: import('pages/admin/student/subsidy/SubsidyList.vue'),
      },
      {
        path: '/admin/file',
        name: 'File',
        component: import('pages/admin/file/FileList.vue'),
      },
      {
        path: '/admin/audittrail',
        name: 'Audit Trail',
        component: import('pages/admin/audittrail/AuditTrailList.vue'),
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
