import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Resource, Category, SearchParams } from "@/types";

// 导出主题store
export { useThemeStore } from "./theme";

// 资源store
export const useResourceStore = defineStore("resource", () => {
  // 状态
  const resources = ref<Resource[]>([]);
  const currentResource = ref<Resource | null>(null);
  const loading = ref(false);
  const searchParams = ref<SearchParams>({
    page: 1,
    pageSize: 20,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const total = ref(0);
  const totalPages = ref(0);

  // 计算属性
  const hasMore = computed(() => {
    return searchParams.value.page! < totalPages.value;
  });

  // 动作
  const setResources = (newResources: Resource[]) => {
    resources.value = newResources;
  };

  const addResources = (newResources: Resource[]) => {
    resources.value.push(...newResources);
  };

  const setCurrentResource = (resource: Resource | null) => {
    currentResource.value = resource;
  };

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };

  const updateSearchParams = (params: Partial<SearchParams>) => {
    searchParams.value = { ...searchParams.value, ...params };
  };

  const resetSearchParams = () => {
    searchParams.value = {
      page: 1,
      pageSize: 20,
      sortBy: "createdAt",
      sortOrder: "desc",
    };
  };

  const setPagination = (totalCount: number, pageSize: number) => {
    total.value = totalCount;
    totalPages.value = Math.ceil(totalCount / pageSize);
  };

  return {
    // 状态
    resources,
    currentResource,
    loading,
    searchParams,
    total,
    totalPages,
    // 计算属性
    hasMore,
    // 动作
    setResources,
    addResources,
    setCurrentResource,
    setLoading,
    updateSearchParams,
    resetSearchParams,
    setPagination,
  };
});

// 分类store
export const useCategoryStore = defineStore("category", () => {
  // 状态
  const categories = ref<Category[]>([]);
  const currentCategory = ref<Category | null>(null);
  const loading = ref(false);

  // 动作
  const setCategories = (newCategories: Category[]) => {
    categories.value = newCategories;
  };

  const setCurrentCategory = (category: Category | null) => {
    currentCategory.value = category;
  };

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };

  // 加载分类数据
  const loadCategories = async () => {
    try {
      setLoading(true);
      const { categoryApi } = await import("@/api");
      const response = await categoryApi.getCategories();

      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("加载分类失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 获取分类树
  const getCategoryTree = computed(() => {
    const buildTree = (items: Category[], parentId?: string): Category[] => {
      return items
        .filter((item) => item.parentId === parentId)
        .map((item) => ({
          ...item,
          children: buildTree(items, item.id),
        }));
    };
    return buildTree(categories.value);
  });

  return {
    // 状态
    categories,
    currentCategory,
    loading,
    // 计算属性
    getCategoryTree,
    // 动作
    setCategories,
    setCurrentCategory,
    setLoading,
    loadCategories,
  };
});
