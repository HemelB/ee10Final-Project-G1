import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('../views/HomeView.vue'),
      name: "home-view",
    },
    {
      path: "/persons",
      component:() => import('../views/PersonsView.vue'),
      name: "person-view",
    },
    {
      path: "/projects",
      component: () => import('../views/ProjectsView.vue'),
      name: "Project-View",
    },
    {
      path: "/tasks",
      component: () => import('../views/TasksView.vue'),
      name: "task-view",
    },
  ]
})

export default router

