<template>
  <div class="min-h-screen">
    <!-- 主要内容 -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 分类筛选 -->
      <div class="mb-8">
        <CategoryFilter @filter-change="handleCategoryFilter" />
      </div>

      <!-- 资源列表 -->
      <div class="mb-8">
        <ResourceList
          :resources="resources"
          :loading="loading"
          :has-more="hasMore"
          @load-more="loadMoreResources"
        />
      </div>

      <!-- 加载更多按钮 -->
      <div
        v-if="hasMore && !loading"
        class="text-center"
      >
        <button
          @click="loadMoreResources"
          class="btn-primary"
        >
          加载更多
        </button>
      </div>

      <!-- 空状态 -->
      <div
        v-if="!loading && resources.length === 0"
        class="text-center py-12"
      >
        <div
          class="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            class="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          暂无资源
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          目前还没有可用的资源，请稍后再试。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useResourceStore } from "@/stores";
import CategoryFilter from "@/components/common/CategoryFilter.vue";
import ResourceList from "@/components/common/ResourceList.vue";

const resourceStore = useResourceStore();

// 响应式数据
const resources = computed(() => resourceStore.resources);
const loading = computed(() => resourceStore.loading);
const hasMore = computed(() => resourceStore.hasMore);

// 方法
const handleCategoryFilter = (categoryId: string) => {
  resourceStore.updateSearchParams({ categoryId, page: 1 });
  loadResources();
};

const loadResources = async () => {
  try {
    resourceStore.setLoading(true);
    const { resourceApi } = await import("@/api");
    const response = await resourceApi.getResources(resourceStore.searchParams);

    if (response.data.success) {
      const { items, total, pageSize } = response.data.data;

      if (resourceStore.searchParams.page === 1) {
        resourceStore.setResources(items);
      } else {
        resourceStore.addResources(items);
      }

      resourceStore.setPagination(total, pageSize);
    }
  } catch (error) {
    console.error("加载资源失败:", error);
  } finally {
    resourceStore.setLoading(false);
  }
};

const loadMoreResources = async () => {
  resourceStore.updateSearchParams({
    page: (resourceStore.searchParams.page || 1) + 1,
  });
  await loadResources();
};

// 生命周期
onMounted(async () => {
  await loadResources();
});
</script>
