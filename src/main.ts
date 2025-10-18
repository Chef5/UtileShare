import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import router from "./router";
import { useThemeStore } from "./stores";

// 导入全局样式
import "./assets/css/main.css";

// 创建应用实例
const app = createApp(App);

// 安装插件
app.use(createPinia());
app.use(router);
app.use(createHead());

// 初始化主题
const themeStore = useThemeStore();
themeStore.initTheme();

// 挂载应用
app.mount("#app");
