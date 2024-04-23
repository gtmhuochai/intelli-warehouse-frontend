import { createApp } from "vue";
import ElementPlus from "element-plus";
import "./style.css";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import cookies from "vue-cookies";
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(pinia);
app.use(ElementPlus);
app.use(router);
app.config.globalProperties.$cookies = cookies;
//   await router.isReady();
app.mount("#app");
