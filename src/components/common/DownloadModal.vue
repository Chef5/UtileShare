<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="handleClose"
      >
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
        >
          <!-- 遮罩层 -->
          <Transition
            name="modal-backdrop"
            appear
          >
            <div
              v-if="show"
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              @click="handleClose"
            ></div>
          </Transition>

          <!-- 弹窗内容 -->
          <Transition
            name="modal-content"
            appear
          >
            <div
              v-if="show"
              class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div
                class="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
              >
                <!-- 关闭按钮 -->
                <button
                  @click="handleClose"
                  class="absolute right-4 top-4 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3
                      class="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-4"
                    >
                      {{ downloadLink?.name }}
                    </h3>

                    <div class="mt-4 space-y-3">
                      <!-- 文件大小 -->
                      <div
                        v-if="downloadLink?.size"
                        class="flex items-center text-sm"
                      >
                        <span class="text-gray-500 dark:text-gray-400 shrink-0"
                          >文件大小：</span
                        >
                        <span
                          class="text-gray-900 dark:text-white font-medium"
                          >{{ downloadLink.size }}</span
                        >
                      </div>

                      <!-- 提取码 -->
                      <div
                        v-if="showCaptcha && downloadLink?.code"
                        class="flex items-center text-sm"
                      >
                        <span class="text-gray-500 dark:text-gray-400 shrink-0"
                          >提取码：</span
                        >
                        <span
                          class="text-gray-900 dark:text-white font-medium font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                          >{{ downloadLink.code }}</span
                        >
                      </div>

                      <!-- 提示信息 -->
                      <div
                        class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg"
                      >
                        <p class="text-sm text-blue-700 dark:text-blue-300">
                          如遇链接失效，请联系反馈。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 底部按钮 -->
              <div
                class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3"
              >
                <button
                  @click="handleDownload"
                  :disabled="downloading"
                  class="inline-flex w-full justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    v-if="downloading"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  {{ downloading ? "获取中..." : "下载" }}
                </button>
                <button
                  @click="handleClose"
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-600 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 sm:mt-0 sm:w-auto"
                >
                  取消
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { DownloadLink } from "@/types";

interface Props {
  show: boolean;
  downloadLink: DownloadLink | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  download: [code: string, type: string];
}>();

const downloading = ref(false);

// 判断是否需要显示提取码
const showCaptcha = computed(() => {
  if (!props.downloadLink) return false;
  const type = props.downloadLink.type;
  return type === "baidu" || type === "aliyun" || type === "123pan";
});

const handleClose = () => {
  if (!downloading.value) {
    emit("close");
  }
};

const handleDownload = async () => {
  if (!props.downloadLink || downloading.value) return;

  try {
    downloading.value = true;
    emit("download", props.downloadLink.code || "", props.downloadLink.type);
  } finally {
    // 下载操作完成后重置状态
    setTimeout(() => {
      downloading.value = false;
    }, 1000);
  }
};
</script>

<style scoped>
/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 遮罩层动画 */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* 内容动画 */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
