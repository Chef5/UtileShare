<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
  >
    <!-- 桌面端布局 -->
    <div class="hidden sm:flex items-center space-x-4">
      <!-- 分类筛选 -->
      <div
        v-if="props.showCategoryFilter"
        class="flex-shrink-0"
      >
        <select
          v-model="selectedCategory"
          @change="handleCategoryChange"
          class="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">全部分类</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- 搜索框 -->
      <div :class="props.showCategoryFilter ? 'flex-1' : 'w-full'">
        <SearchBox />
      </div>
    </div>

    <!-- 移动端布局 -->
    <div class="sm:hidden space-y-3">
      <!-- 搜索框 -->
      <div>
        <SearchBox />
      </div>

      <!-- 分类筛选 -->
      <div v-if="props.showCategoryFilter">
        <select
          v-model="selectedCategory"
          @change="handleCategoryChange"
          class="block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">全部分类</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "@/stores";
import SearchBox from "./SearchBox.vue";

// 定义 Props
interface Props {
  showCategoryFilter?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showCategoryFilter: true,
});

// 定义事件
const emit = defineEmits<{
  filterChange: [categoryId: string];
}>();

const categoryStore = useCategoryStore();

// 响应式数据
const selectedCategory = ref("");

// 计算属性
const categories = computed(() => categoryStore.categories);

// 方法
const handleCategoryChange = () => {
  emit("filterChange", selectedCategory.value);
};

// 生命周期
onMounted(async () => {
  await categoryStore.loadCategories();
});
</script>
