<template>
  <div class="min-h-screen">
    <!-- 加载状态 -->
    <div
      v-if="loading"
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div class="animate-pulse">
        <div class="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- 资源详情 -->
    <div
      v-else-if="resource"
      class="min-h-screen"
    >
      <!-- 主要内容 -->
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 资源信息 -->
          <div class="lg:col-span-2">
            <div class="card">
              <div class="card-header">
                <h2 class="text-lg font-semibold text-gray-900">
                  {{ resource.name }}
                </h2>
              </div>
              <div class="card-body">
                <div
                  class="prose max-w-none"
                  v-html="resource.description"
                ></div>
              </div>
            </div>

            <!-- 标签 -->
            <div
              v-if="resource.tags && resource.tags.length > 0"
              class="mt-6"
            >
              <h3 class="text-sm font-semibold text-gray-900 mb-3">标签</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in resource.tags"
                  :key="tag"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- 下载区域 -->
          <div class="lg:col-span-1">
            <div class="card sticky top-8">
              <div class="card-header">
                <h2 class="text-lg font-semibold text-gray-900">下载链接</h2>
              </div>
              <div class="card-body">
                <div class="space-y-3">
                  <div
                    v-for="link in resource.downloadLinks"
                    :key="link.id"
                    class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ link.name }}
                      </p>
                      <p
                        v-if="link.size"
                        class="text-xs text-gray-500"
                      >
                        {{ link.size }}
                      </p>
                    </div>
                    <a
                      :href="link.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="ml-3 btn-primary text-xs"
                    >
                      下载
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div
      v-else
      class="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div class="text-center py-12">
        <div
          class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">资源不存在</h3>
        <p class="text-gray-600 mb-4">您访问的资源可能已被删除或不存在。</p>
        <RouterLink
          to="/"
          class="btn-primary"
        >
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useResourceStore } from "@/stores";
import type { Resource } from "@/types";

// Props
interface Props {
  id: string;
}
const props = defineProps<Props>();

const route = useRoute();
const resourceStore = useResourceStore();

// 响应式数据
const loading = ref(false);
const resource = ref<Resource | null>(null);

// 方法
const loadResource = async () => {
  try {
    loading.value = true;
    const { resourceApi } = await import("@/api");
    const response = await resourceApi.getResourceById(props.id);

    if (response.success) {
      resource.value = response.data;
      resourceStore.setCurrentResource(response.data);
    } else {
      resource.value = null as any;
    }
  } catch (error) {
    console.error("加载资源详情失败:", error);
    resource.value = null as any;
  } finally {
    loading.value = false;
  }
};

// 生命周期
onMounted(async () => {
  await loadResource();
});
</script>

<style scoped>
.prose {
  @apply text-gray-700 leading-relaxed;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply font-semibold text-gray-900 mt-6 mb-3;
}

.prose h1 {
  @apply text-2xl;
}
.prose h2 {
  @apply text-xl;
}
.prose h3 {
  @apply text-lg;
}

.prose p {
  @apply mb-4;
}

.prose ul,
.prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-2;
}

.prose a {
  @apply text-primary-600 hover:text-primary-700 underline;
}

.prose code {
  @apply bg-gray-100 px-1 py-0.5 rounded text-sm font-mono;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4;
}
</style>
