import type {
  ApiResponse,
  Resource,
  ResourceListResponse,
  CategoryListResponse,
  SearchParams,
} from "@/types";
import config from "@/config.json";
import { createApiClient } from "./http";

// 创建单例 API 客户端
const apiClient = createApiClient();

/**
 * 真实API
 * 用于生产环境，发起实际的HTTP请求
 */
export const realApi = {
  // 获取资源列表
  getResources: async (
    params: SearchParams = {}
  ): Promise<ApiResponse<ResourceListResponse>> => {
    const url = config.api.endpoints.resources.list;
    const response = await apiClient.get(url, { params });
    return response.data;
  },

  // 获取资源详情
  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    const url = config.api.endpoints.resources.detail.replace(":id", id);
    const response = await apiClient.get(url);
    return response.data;
  },

  // 获取分类列表
  getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
    const url = config.api.endpoints.categories.list;
    const response = await apiClient.get(url);
    return response.data;
  },

  // 获取下载链接
  getDownloadUrl: async (
    code: string,
    type: string
  ): Promise<ApiResponse<{ url: string }>> => {
    const url = config.api.endpoints.resources.download;
    const response = await apiClient.post(url, {
      code,
      type,
    });
    return response.data;
  },
};
