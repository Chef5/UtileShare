import type {
  ApiResponse,
  Resource,
  ResourceListResponse,
  CategoryListResponse,
  SearchParams,
} from "@/types";
import {
  mockResources,
  mockCategories,
  mockDelay,
  paginateData,
  searchResources,
  sortResources,
} from "@/data/mockData";
import config from "@/config.json";
import axios, { type AxiosInstance } from "axios";

// 从环境变量获取API配置
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

// 创建 Axios 实例
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 请求拦截器
  client.interceptors.request.use(
    (config) => {
      // 记录API请求日志
      console.log(
        `API Request: ${config.method?.toUpperCase()} ${config.url}`,
        config.data
      );

      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // 响应拦截器
  client.interceptors.response.use(
    (response) => {
      // 记录API响应日志
      console.log(`API Response: ${response.config.url}`, response.data);
      return response;
    },
    (error) => {
      console.error("Response error:", error);
      return Promise.reject(error);
    }
  );

  return client;
};

// 模拟数据API
const mockApi = {
  // 获取资源列表
  getResources: async (
    params: SearchParams = {}
  ): Promise<ApiResponse<ResourceListResponse>> => {
    await mockDelay(200);

    const {
      keyword,
      categoryId,
      tags,
      page = 1,
      pageSize = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = params;

    // 搜索和筛选
    let filteredResources = searchResources(
      mockResources,
      keyword,
      categoryId,
      tags
    );

    // 排序
    filteredResources = sortResources(filteredResources, sortBy, sortOrder);

    // 分页
    const paginatedData = paginateData(filteredResources, page, pageSize);

    return {
      data: {
        code: 200,
        message: "获取资源列表成功",
        data: paginatedData,
        success: true,
      },
    } as any;
  },

  // 获取资源详情
  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    await mockDelay(200);

    const resource = mockResources.find((r) => r.id === id);

    if (!resource) {
      throw new Error("资源不存在");
    }

    return {
      data: {
        code: 200,
        message: "获取资源详情成功",
        data: resource,
        success: true,
      },
    } as any;
  },

  // 获取分类列表
  getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
    await mockDelay(200);

    return {
      data: {
        code: 200,
        message: "获取分类列表成功",
        data: mockCategories,
        success: true,
      },
    } as any;
  },
};

// 真实API
const realApi = {
  // 获取资源列表
  getResources: async (
    params: SearchParams = {}
  ): Promise<ApiResponse<ResourceListResponse>> => {
    const client = createApiClient();
    const url = config.api.endpoints.resources.list;

    const response = await client.get(url, { params });
    return response.data;
  },

  // 获取资源详情
  getResourceById: async (id: string): Promise<ApiResponse<Resource>> => {
    const client = createApiClient();
    const url = config.api.endpoints.resources.detail.replace(":id", id);

    const response = await client.get(url);
    return response.data;
  },

  // 获取分类列表
  getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
    const client = createApiClient();
    const url = config.api.endpoints.categories.list;

    const response = await client.get(url);
    return response.data;
  },
};

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
