<template>
  <div
    id="app"
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <!-- 应用布局 -->
    <AppLayout>
      <!-- 路由视图 -->
      <RouterView v-slot="{ Component, route }">
        <Transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.path"
          />
        </Transition>
      </RouterView>
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useHead } from "@vueuse/head";
import AppLayout from "@/layouts/AppLayout.vue";
import config from "@/config.json";

// 设置全局head信息
useHead({
  title: `${config.app.title} - 实用资源分享网站`,
  meta: [
    {
      name: "description",
      content: config.app.description,
    },
    {
      name: "keywords",
      content: `资源分享,实用工具,下载,${config.app.title}`,
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
});

// 应用初始化
onMounted(() => {
  console.log(`${config.app.title} 应用已启动`);
});
</script>

<style scoped>
#app {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
}
</style>
