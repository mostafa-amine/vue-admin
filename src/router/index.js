import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useAuth } from '@/stores/auth';

async function auth(to, from, next) {
  const auth = useAuth();

  if (!localStorage.getItem("access_token")) {
    return next({ name: "login" });
  }

  if (to.meta.permission) {
    if (!auth.permissions) {
      await auth.getAuthenticatedUser();
    }
    if (!auth.can(to.meta.permission)) {
      return next({ name: "Dashboard" });
    }
  }

  next();
}

function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "Users" });
  }

  next();
}

const routes = [
  {
    path: "/register",
    name: "register",
    beforeEnter: guest,
    component: () => import("@/views/Auth/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: guest,
    component: () => import("@/views/Auth/LoginView.vue"),
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        beforeEnter: auth,
        component: () =>
          import(
            '@/views/dashboard/Dashboard.vue'
          ),
      },
      {
        path: "/users",
        name: "Users",
        beforeEnter: auth,
        meta: { permission: "users.view" },
        component: () => import("@/views/Users/IndexView.vue"),
      },
      {
        path: "/users/create",
        name: "users.create",
        beforeEnter: auth,
        meta: { permission: "users.create" },
        component: () => import("@/views/Users/CreateView.vue"),
      },
      {
        path: "/users/:uuid/edit",
        name: "users.edit",
        beforeEnter: auth,
        meta: { permission: "users.edit" },
        component: () => import("@/views/Users/EditView.vue"),
      },
      {
        path: "/users/:uuid",
        name: "users.detail",
        beforeEnter: auth,
        meta: { permission: "users.view" },
        component: () => import("@/views/Users/DetailView.vue"),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
