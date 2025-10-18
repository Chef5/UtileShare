<template>
  <div class="md:hidden bg-white border-t border-gray-200">
    <div class="px-4 py-2 space-y-1">
      <!-- 移动端搜索框 -->
      <div class="mb-4">
        <SearchBox />
      </div>

      <!-- 导航链接 -->
      <router-link
        to="/"
        class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
        @click="$emit('close')"
      >
        首页
      </router-link>
      <router-link
        to="/categories"
        class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
        @click="$emit('close')"
      >
        分类
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBox from "@/components/common/SearchBox.vue";

defineEmits<{
  close: [];
}>();
</script>
