// 资源类型定义
export interface Resource {
  id: string;
  name: string;
  description: string;
  size: string;
  categoryId: string;
  categoryName: string;
  downloadLinks: DownloadLink[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  views: number;
  downloads: number;
}

// 下载链接类型枚举
export type DownloadLinkType =
  | "direct"
  | "baidu"
  | "aliyun"
  | "123pan"
  | "other";

// 下载链接类型
export interface DownloadLink {
  id: string;
  name: string;
  type: DownloadLinkType;
  code?: string;
  size?: string;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  description: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  resourceCount: number;
}

// 搜索参数类型
export interface SearchParams {
  keyword?: string;
  categoryId?: string;
  tags?: string[];
  page?: number;
  pageSize?: number;
  sortBy?: "createdAt" | "updatedAt" | "views" | "downloads" | "name";
  sortOrder?: "asc" | "desc";
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 资源列表响应类型
export type ResourceListResponse = PaginatedResponse<Resource>;

// 分类列表响应类型
export type CategoryListResponse = Category[];
