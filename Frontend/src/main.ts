import { createApp } from "vue";
import "./plugins/assets";
import App from "./App.vue";
import naive from "naive-ui";
import { setupRouter } from "./router/index.ts";
import { install } from "@icon-park/vue-next/es/all";
import "@icon-park/vue-next/styles/index.css";
const app = createApp(App);
import "./styles/neumorphism.scss";
import { setupI18n } from "./locales";
import { setupDayjs } from "./plugins/dayjs.ts";
import { setupStore } from "./stores";

// 全局安装icon park（默认前缀 'icon'）
install(app);
/** 初始化日期插件 **/
setupDayjs();
/** 初始化naive-ui框架 **/
app.use(naive);
/** 初始化pinia**/
setupStore(app);
/** 初始化路由 **/
await setupRouter(app);
/** 初始i18n国际化 **/
setupI18n(app);
app.mount("#app");
