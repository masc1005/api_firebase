import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./plugins/axios";

const app = createApp(App);

app.provide("$axios", axios);

app.use(router).mount("#app");
