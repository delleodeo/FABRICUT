import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import HomePage from '../views/HomePage.vue'
import ClientList from '../views/ClientList.vue'
import Records from '../views/Records.vue'
import Schedule from '../views/Schedule.vue'
import Status from '../views/Status.vue'
import AboutUs from '../views/AboutUs.vue'
import AppController from '../views/AppController.vue'
import LandingPage from '../views/LandingPage.vue'

const routes = [
  // Landing page shown at root
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },

  // Main application (dashboard) mounted at /dashboard
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomePage
      },
      {
        path: 'clients',
        name: 'Clients',
        component: ClientList
      },
      {
        path: 'records',
        name: 'Records',
        component: Records
      },
      {
        path: 'schedule',
        name: 'Schedule',
        component: Schedule
      },
      {
        path: 'status',
        name: 'Status',
        component: Status
      },
      {
        path: 'about',
        name: 'About',
        component: AboutUs
      },
      {
        path: 'app-controller',
        name: 'AppController',
        component: AppController
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
