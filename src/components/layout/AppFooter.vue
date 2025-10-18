<template>
  <footer
    class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <!-- 网站信息 -->
        <div class="flex items-center justify-center space-x-2 mb-4">
          <div
            class="w-6 h-6 bg-primary-600 rounded flex items-center justify-center"
          >
            <span class="text-white font-bold text-xs">U</span>
          </div>
          <span class="text-lg font-bold text-gray-900 dark:text-white">{{
            config.app.title
          }}</span>
        </div>
        <p
          class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto"
        >
          {{ config.app.description }}
        </p>
        <div class="text-xs text-gray-500 dark:text-gray-500">
          © {{ currentYear }} {{ config.app.title }}. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import config from "@/config.json";

// 计算属性
const currentYear = computed(() => new Date().getFullYear());
</script>
