import type {
  ApiResponse,
  Resource,
  ResourceListResponse,
  CategoryListResponse,
  SearchParams,
} from "@/types";
import config from "@/config.json";
import { mockApi } from "./mockApi";
import { realApi } from "./api";

// 资源相关API
export const resourceApi = {
  // 获取资源列表
  getResources: async (
    params: SearchParams = {}
  ): Promise<ApiResponse<ResourceListResponse>> => {
    if (config.useMockData) {
      return mockApi.getResources(params);
    }
    return realApi.getResources(params);
  },

  // 获取资源详情
  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    if (config.useMockData) {
      return mockApi.getResourceById(id);
    }
    return realApi.getResourceById(id);
  },
};

// 分类相关API
export const categoryApi = {
  // 获取所有分类
  getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
    if (config.useMockData) {
      return mockApi.getCategories();
    }
    return realApi.getCategories();
  },

  // 获取分类下的资源
  getResourcesByCategory: async (
    categoryId: string,
    params: SearchParams = {}
  ): Promise<ApiResponse<ResourceListResponse>> => {
    if (config.useMockData) {
      return mockApi.getResources({ ...params, categoryId });
    }
    return realApi.getResources({ ...params, categoryId });
  },
};

// 导出配置，方便外部使用
export { default as appConfig } from "@/config.json";
