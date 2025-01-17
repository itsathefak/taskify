import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";
import CreateTask from "./pages/CreateTask.vue";
import EditTask from "./pages/EditTask.vue";

// Add routes for create and edit tasks
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/create-task", component: CreateTask, meta: { requiresAuth: true } },
  { path: "/edit-task/:id", component: EditTask, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); 
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
