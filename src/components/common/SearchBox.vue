<template>
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
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

// 定义 Props
interface Props {
  initialValue?: string;
}
const props = withDefaults(defineProps<Props>(), {
  initialValue: "",
});

const router = useRouter();
const searchKeyword = ref(props.initialValue);

// 监听 initialValue 变化
watch(
  () => props.initialValue,
  (newValue) => {
    searchKeyword.value = newValue;
  }
);

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      name: "Search",
      query: { q: searchKeyword.value.trim() },
    });
  }
};
</script>
