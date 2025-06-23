import { createApp } from "vue";
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入状态管理
import pinia from "./store";
// 引入antD组件库
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import "./assets/css/index.scss";
VueMarkdownEditor.use(vuepressTheme);

const app = createApp(App);
// 强制设置中文
dayjs.locale("zh-cn");
app.use(VueMarkdownEditor as unknown as { install: () => void });
app.use(router);
app.use(pinia);
app.use(Antd);
app.mount("#app");
