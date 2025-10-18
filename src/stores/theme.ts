import { defineStore } from "pinia";
import { ref } from "vue";
import config from "@/config.json";

export const useThemeStore = defineStore("theme", () => {
  // 主题状态
  const currentTheme = ref<"light" | "dark">(
    config.defaultTheme as "light" | "dark"
  );

  // 切换主题
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    applyTheme();
  };

  // 设置主题
  const setTheme = (theme: "light" | "dark") => {
    currentTheme.value = theme;
    applyTheme();
  };

  // 应用主题到 DOM
  const applyTheme = () => {
    const html = document.documentElement;
    if (currentTheme.value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    // 保存到 localStorage
    localStorage.setItem("theme", currentTheme.value);
  };

  // 初始化主题
  const initTheme = () => {
    // 优先使用 localStorage 中的主题
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      currentTheme.value = savedTheme;
    } else {
      // 使用配置文件中的默认主题
      currentTheme.value = config.defaultTheme as "light" | "dark";
    }
    applyTheme();
  };

  return {
    currentTheme,
    toggleTheme,
    setTheme,
    initTheme,
  };
});
