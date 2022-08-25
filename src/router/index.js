import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"
import Login from "../views/LoginView.vue"
import Networking from "../views/Networking.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/networking',
    name: 'networking',
    component: Networking,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/networking");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
