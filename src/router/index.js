import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
      name: "home-view",
    },
    {
      path: "/persons",
      component: () => import("../views/main-views/PersonsView.vue"),
      name: "person-view",
    },
    {
      path: "/projects",
      component: () => import("../views/main-views/ProjectsView.vue"),
      name: "Project-View",
    },
    {
      path: "/tasks",
      component: () => import("../views/main-views/TasksView.vue"),
      name: "task-view",
    },
    {
      path: "/person/:id",
      component: () => import("../views/detail-views/PersonDetail.vue"),
      name: "person-detail",
    },
    {
      path: "/task/:id",
      component: () => import("../views/detail-views/TaskDetail.vue"),
      name: "task-detail",
    },
    {
      path: "/project/:id",
      component: () => import("../views/detail-views/ProjectDetail.vue"),
      name: "project-detail",
    },
    {
      path: "/projectform",
      component: () => import("../views/form-views/ProjectForm.vue"),
      name: "project-form",
    },
    {
      path: "/projectform/:id",
      component: () => import("../views/form-views/ProjectForm.vue"),
      name: "project-form-edit",
    },
    {
      path: "/taskform",
      component: () => import("../views/form-views/TaskForm.vue"),
      name: "task-form",
    },
    {
      path: "/taskform/:id",
      component: () => import("../views/form-views/TaskForm.vue"),
      name: "task-form-edit",
    },
    {
      path: "/personform",
      component: () => import("../views/form-views/PersonForm.vue"),
      name: "person-form",
    },
    {
      path: "/personform/:id",
      component: () => import("../views/form-views/PersonForm.vue"),
      name: "person-form-edit",
    },
  ],
});

export default router;
