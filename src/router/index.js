import { createRouter, createWebHistory } from 'vue-router';
import AccessPage from '../views/AccessPage/AccessPage.vue';
import ClassRecordings from '../views/Recordings/ClassRecordings.vue';
import AdminDashboard from '../views/ElAdmin/AdminDash.vue'
import AdminClasses from '../components/Dashboards/ClassesDashboard/ClassesDashboard.vue'
const routes = [
  {
    path: '/',
    name: 'AccessPage',
    component: AccessPage
  },
  {
    path: '/recordings/:classId',
    name: 'ClassRecordings',
    component: ClassRecordings
  },
  {
    path: '/user-admin',
    name: 'AdminDash',
    component: AdminDashboard
  },
  {
    path: '/class-admin',
    name: 'AdminClasses',
    component: AdminClasses
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
