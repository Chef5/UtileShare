<template>
  <div
    v-if="tags && tags.length > 0"
    class="flex flex-wrap gap-1"
  >
    <span
      v-for="tag in displayTags"
      :key="tag"
      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      {{ tag }}
    </span>
    <span
      v-if="showMoreCount"
      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      +{{ moreCount }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  tags: string[];
  maxDisplay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxDisplay: 3,
});

// 计算显示的标签
const displayTags = computed(() => {
  return props.tags.slice(0, props.maxDisplay);
});

// 计算是否显示更多数量
const showMoreCount = computed(() => {
  return props.tags.length > props.maxDisplay;
});

// 计算更多数量
const moreCount = computed(() => {
  return props.tags.length - props.maxDisplay;
});
</script>
