import { createApp } from "vue";
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入antD组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./assets/css/index.scss";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
// 强制设置中文
dayjs.locale("zh-cn");
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
