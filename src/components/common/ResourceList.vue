<template>
  <div class="space-y-6">
    <!-- 加载状态 -->
    <div
      v-if="loading && resources.length === 0"
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="card animate-pulse"
      >
        <div class="card-body">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- 资源列表 -->
    <div
      v-else
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
    >
      <ResourceItem
        v-for="resource in resources"
        :key="resource.id"
        :resource="resource"
      />
    </div>

    <!-- 加载更多状态 -->
    <div
      v-if="loading && resources.length > 0"
      class="text-center py-4"
    >
      <div class="inline-flex items-center space-x-2 text-gray-500">
        <svg
          class="animate-spin h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>加载中...</span>
      </div>
    </div>

    <!-- 加载更多按钮 -->
    <div
      v-if="hasMore && !loading"
      class="text-center"
    >
      <button
        @click="$emit('loadMore')"
        class="btn-primary"
      >
        加载更多
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ResourceItem from "./ResourceItem.vue";
import type { Resource } from "@/types";

// Props
interface Props {
  resources: Resource[];
  loading: boolean;
  hasMore: boolean;
}

defineProps<Props>();

// 定义事件
defineEmits<{
  loadMore: [];
}>();
</script>

<style scoped>
/* 样式已移至 ResourceItem 组件 */
</style>
