<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">筛选条件</h3>

    <!-- 分类筛选 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">资源分类</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            :value="''"
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">全部分类</span>
        </label>
        <label
          v-for="category in categories"
          :key="category.id"
          class="flex items-center"
        >
          <input
            type="radio"
            :value="category.id"
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
          <span class="ml-auto text-xs text-gray-500">{{
            category.resourceCount
          }}</span>
        </label>
      </div>
    </div>

    <!-- 排序方式 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">排序方式</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            value="createdAt"
            v-model="sortBy"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">按时间排序</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="views"
            v-model="sortBy"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">按浏览量排序</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="downloads"
            v-model="sortBy"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">按下载量排序</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="name"
            v-model="sortBy"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">按名称排序</span>
        </label>
      </div>
    </div>

    <!-- 排序顺序 -->
    <div class="mb-6">
      <h4 class="text-sm font-medium text-gray-700 mb-3">排序顺序</h4>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="radio"
            value="desc"
            v-model="sortOrder"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">降序</span>
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            value="asc"
            v-model="sortOrder"
            @change="handleSortChange"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span class="ml-2 text-sm text-gray-700">升序</span>
        </label>
      </div>
    </div>

    <!-- 重置按钮 -->
    <button
      @click="resetFilters"
      class="w-full btn-outline"
    >
      重置筛选
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCategoryStore } from "@/stores";

// 定义事件
const emit = defineEmits<{
  filterChange: [categoryId: string];
}>();

const categoryStore = useCategoryStore();

// 响应式数据
const selectedCategory = ref("");
const sortBy = ref("createdAt");
const sortOrder = ref<"asc" | "desc">("desc");

// 计算属性
const categories = computed(() => categoryStore.categories);

// 方法
const handleCategoryChange = () => {
  emit("filterChange", selectedCategory.value);
};

const handleSortChange = () => {
  emit("filterChange", selectedCategory.value);
};

const resetFilters = () => {
  selectedCategory.value = "";
  sortBy.value = "createdAt";
  sortOrder.value = "desc";
  emit("filterChange", "");
};

// 生命周期
onMounted(async () => {
  await categoryStore.loadCategories();
});
</script>
