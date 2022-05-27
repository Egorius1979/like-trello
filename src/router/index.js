import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "@/components/MainPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/like-trello/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/like-trello/login",
    name: "login",
    component: () => import("../components/AuthPage.vue"),
  },
  {
    path: "/like-trello/reg",
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
