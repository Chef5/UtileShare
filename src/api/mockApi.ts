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

/**
 * 模拟数据API
 * 用于开发和测试环境，提供模拟数据返回
 */
export const mockApi = {
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
      code: 200,
      message: "获取资源列表成功",
      data: paginatedData,
      success: true,
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
      code: 200,
      message: "获取资源详情成功",
      data: resource,
      success: true,
    } as any;
  },

  // 获取分类列表
  getCategories: async (): Promise<ApiResponse<CategoryListResponse>> => {
    await mockDelay(200);

    return {
      code: 200,
      message: "获取分类列表成功",
      data: mockCategories,
      success: true,
    } as any;
  },

  // 获取下载链接
  getDownloadUrl: async (
    _code: string,
    type: string
  ): Promise<ApiResponse<{ url: string }>> => {
    await mockDelay(300);

    // 模拟返回下载链接
    const mockUrls: Record<string, string> = {
      baidu: "https://pan.baidu.com/s/example",
      aliyun: "https://www.aliyundrive.com/s/example",
      "123pan": "https://www.123pan.com/s/example",
      direct: "https://example.com/download/file.zip",
      other: "https://example.com/download",
    };

    return {
      code: 200,
      message: "获取下载链接成功",
      data: {
        url: mockUrls[type] || mockUrls.other,
      },
      success: true,
    } as any;
  },
};
