<template>
  <div class="space-y-6">
    <!-- 加载状态 -->
    <div
      v-if="loading && resources.length === 0"
      class="space-y-4"
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
      class="space-y-4"
    >
      <div
        v-for="resource in resources"
        :key="resource.id"
        class="card hover:shadow-md transition-shadow duration-200"
      >
        <div class="card-body">
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <!-- 资源标题 -->
              <RouterLink
                :to="`/resource/${resource.id}`"
                class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
              >
                {{ resource.name }}
              </RouterLink>

              <!-- 资源描述 -->
              <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                {{ resource.description }}
              </p>

              <!-- 资源信息 -->
              <div
                class="mt-4 flex items-center space-x-6 text-sm text-gray-500"
              >
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                    />
                  </svg>
                  {{ resource.size }}
                </span>
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  {{ resource.categoryName }}
                </span>
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {{ resource.views }} 次浏览
                </span>
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {{ resource.downloads }} 次下载
                </span>
              </div>

              <!-- 标签 -->
              <div
                v-if="resource.tags && resource.tags.length > 0"
                class="mt-3"
              >
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="tag in resource.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {{ tag }}
                  </span>
                  <span
                    v-if="resource.tags.length > 3"
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    +{{ resource.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="ml-4 flex-shrink-0">
              <RouterLink
                :to="`/resource/${resource.id}`"
                class="btn-primary text-sm"
              >
                查看详情
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
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
import { RouterLink } from "vue-router";
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
