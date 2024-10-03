import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/Login.vue";
import HomePage from "../views/Home.vue";
import RegisterPage from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
