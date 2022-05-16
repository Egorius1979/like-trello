import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/components/MainPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/AuthPage.vue"),
  },
  {
    path: "/reg",
    name: "registration",
    component: () => import("../components/AuthPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
