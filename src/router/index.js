import { createRouter, createWebHistory, useRouter } from "vue-router";
import useLoginStore from "../store/login";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/home",
      component: () => import("../components/home.vue"),
      children: [
        { path: "simple", component: () => import("../components/simple.vue") },
        { path: "model", component: () => import("../components/model.vue") },
        {
          path: "validate",
          component: () => import("../components/validate.vue"),
        },
        {
          path: "upload",
          component: () => import("../components/uploadFile.vue"),
        },
        {
          path: "student",
          component: () => import("../components/student.vue"),
        },
      ],
    },
    { path: "/", redirect: "/home" },
    {
      name: "login",
      path: "/login",
      component: () => import("../components/login.vue"),
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const loginStore = useLoginStore();
//   if (to.name === "home") {
//     if (loginStore.getIsLogin) {
//       next();
//     } else {
//       next({ name: "login" });
//     }
//   } else {
//     next();
//   }
// });

export const goToLogin = () => {
  router.push({ name: "login" });
};
export default router;
