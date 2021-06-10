import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { watch } from "vue";
import Home from "../views/Home.vue";
import { user, initialised } from "@/components/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Users.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/aviso-legal",
    name: "aviso-legal",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Legal/avisoLegal.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/politica-privacidad",
    name: "pPrivacidad",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Legal/pPrivacidad.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/politica-de-cookies",
    name: "pCookies",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Legal/pCookies.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/terminos-y-condiciones",
    name: "terCondiciones",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "@/views/Legal/terCondiciones.vue"
      ),
    meta: {
      public: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (initialised.value) {
    if (!to.matched.some((record) => record.meta.public) && !user.value) {
      return next("/auth");
    }
    next();
  } else {
    watch(
      () => initialised.value,
      (newVal) => {
        if (newVal) {
          if (!to.matched.some((record) => record.meta.public) && !user.value) {
            return next("/auth");
          }

          next();
        }
      }
    );
  }
});

export default router;
