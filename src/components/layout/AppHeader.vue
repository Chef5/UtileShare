<template>
  <header
    class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo 和标题 -->
        <div class="flex items-center">
          <router-link
            to="/"
            class="flex items-center space-x-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <div
              class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">U</span>
            </div>
            <span class="text-xl font-bold">UtileShare</span>
          </router-link>
        </div>

        <!-- 右侧操作区 -->
        <div class="flex items-center space-x-4">
          <!-- 主题切换按钮 -->
          <button
            @click="toggleTheme"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="切换主题"
          >
            <!-- 太阳图标 (暗色模式时显示) -->
            <svg
              v-if="isDark"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <!-- 月亮图标 (亮色模式时显示) -->
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const { isDark } = themeStore;
</script>
