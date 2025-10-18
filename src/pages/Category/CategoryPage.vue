<template>
  <div class="min-h-screen">
    <!-- 主要内容 -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 筛选和排序 -->
      <div class="mb-8">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600"> 共 {{ total }} 个资源 </span>
          </div>
          <div class="flex items-center space-x-4">
            <select
              v-model="sortBy"
              @change="handleSortChange"
              class="input w-auto"
            >
              <option value="createdAt">按时间排序</option>
              <option value="updatedAt">按更新时间</option>
              <option value="views">按浏览量</option>
              <option value="downloads">按下载量</option>
              <option value="name">按名称排序</option>
            </select>
            <button
              @click="toggleSortOrder"
              class="btn-outline flex items-center space-x-1"
            >
              <span>{{ sortOrder === "asc" ? "升序" : "降序" }}</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
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
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">该分类暂无资源</h3>
        <p class="text-gray-600">该分类下还没有可用的资源，请稍后再试。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useResourceStore, useCategoryStore } from "@/stores";
import ResourceList from "@/components/common/ResourceList.vue";

// Props
interface Props {
  id: string;
}
const props = defineProps<Props>();

const resourceStore = useResourceStore();
const categoryStore = useCategoryStore();

// 响应式数据
const resources = computed(() => resourceStore.resources);
const loading = computed(() => resourceStore.loading);
const hasMore = computed(() => resourceStore.hasMore);
const total = computed(() => resourceStore.total);
const sortBy = ref("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");

// 方法
const handleSortChange = () => {
  resourceStore.updateSearchParams({
    sortBy: sortBy.value,
    page: 1,
  });
  loadResources();
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  resourceStore.updateSearchParams({
    sortOrder: sortOrder.value,
    page: 1,
  });
  loadResources();
};

const loadResources = async () => {
  try {
    resourceStore.setLoading(true);
    const { categoryApi } = await import("@/api");
    const response = await categoryApi.getResourcesByCategory(props.id, {
      ...resourceStore.searchParams,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    });

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
    console.error("加载分类资源失败:", error);
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

// 监听分类ID变化
watch(
  () => props.id,
  (newId) => {
    resourceStore.resetSearchParams();
    resourceStore.updateSearchParams({ categoryId: newId });
    loadResources();
  },
  { immediate: true }
);

// 生命周期
onMounted(async () => {
  // 加载分类数据
  await categoryStore.loadCategories();
});
</script>
