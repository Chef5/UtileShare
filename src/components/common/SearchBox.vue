<template>
  <div class="relative">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="搜索资源..."
        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        @keyup.enter="handleSearch"
        @input="handleInput"
      />
    </div>

    <!-- 搜索建议下拉框 -->
    <Transition name="fade">
      <div
        v-if="showSuggestions && suggestions.length > 0"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
          @click="selectSuggestion(suggestion)"
        >
          <span class="font-normal block truncate">{{ suggestion }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";

const router = useRouter();
// 响应式数据
const searchKeyword = ref("");
const suggestions = ref<string[]>([]);
const showSuggestions = ref(false);

// 防抖搜索
const debouncedSearch = useDebounceFn(async (keyword: string) => {
  if (keyword.length < 2) {
    suggestions.value = [];
    showSuggestions.value = false;
    return;
  }

  try {
    // 这里可以调用搜索建议API
    // const response = await searchApi.getSuggestions(keyword)
    // suggestions.value = response.data.suggestions

    // 临时模拟数据
    suggestions.value = [
      `${keyword} 相关资源1`,
      `${keyword} 相关资源2`,
      `${keyword} 相关资源3`,
    ];
    showSuggestions.value = true;
  } catch (error) {
    console.error("获取搜索建议失败:", error);
  }
}, 300);

// 方法
const handleInput = () => {
  debouncedSearch(searchKeyword.value);
};

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      name: "Search",
      query: { q: searchKeyword.value.trim() },
    });
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion: string) => {
  searchKeyword.value = suggestion;
  showSuggestions.value = false;
  handleSearch();
};

// 监听点击外部关闭建议框
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    showSuggestions.value = false;
  }
};

// 生命周期
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
