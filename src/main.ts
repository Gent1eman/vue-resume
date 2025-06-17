import { createApp } from "vue";
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入状态管理
import pinia from "./store";
// 引入antD组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
