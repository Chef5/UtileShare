import type { Resource, Category, DownloadLink } from "@/types";

// 模拟分类数据
export const mockCategories: Category[] = [
  {
    id: "1",
    name: "开发工具",
    description: "各种开发相关的工具和软件",
    icon: "🛠️",
    resourceCount: 15,
  },
  {
    id: "2",
    name: "设计资源",
    description: "UI/UX设计相关的资源和素材",
    icon: "🎨",
    resourceCount: 12,
  },
  {
    id: "3",
    name: "学习资料",
    description: "编程学习、技术文档等资料",
    icon: "📚",
    resourceCount: 20,
  },
  {
    id: "4",
    name: "实用工具",
    description: "日常工作中使用的各种工具",
    icon: "⚡",
    resourceCount: 8,
  },
  {
    id: "5",
    name: "模板资源",
    description: "各种项目模板和代码片段",
    icon: "📋",
    resourceCount: 10,
  },
];

// 模拟下载链接数据
const createDownloadLinks = (count: number = 2): DownloadLink[] => {
  const links: DownloadLink[] = [];
  for (let i = 0; i < count; i++) {
    links.push({
      id: `link-${i + 1}`,
      name: i === 0 ? "直接下载" : `备用链接 ${i}`,
      url: `https://example.com/download/${i + 1}`,
      type: "direct",
      size: `${Math.floor(Math.random() * 50) + 10}MB`,
    });
  }
  return links;
};

// 模拟资源数据
export const mockResources: Resource[] = [
  {
    id: "1",
    name: "Vue 3 开发指南",
    description:
      "Vue 3 完整开发指南，包含 Composition API、TypeScript 集成等最新特性",
    size: "25.6MB",
    categoryId: "3",
    categoryName: "学习资料",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:20:00Z",
    tags: ["Vue", "JavaScript", "前端", "教程"],
    views: 1250,
    downloads: 89,
  },
  {
    id: "2",
    name: "Figma 设计系统模板",
    description: "完整的设计系统模板，包含组件库、颜色规范、字体系统等",
    size: "12.3MB",
    categoryId: "2",
    categoryName: "设计资源",
    downloadLinks: createDownloadLinks(3),
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
    tags: ["Figma", "设计系统", "UI", "模板"],
    views: 890,
    downloads: 156,
  },
  {
    id: "3",
    name: "VS Code 扩展包",
    description: "前端开发必备的 VS Code 扩展集合，提升开发效率",
    size: "8.7MB",
    categoryId: "1",
    categoryName: "开发工具",
    downloadLinks: createDownloadLinks(1),
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-19T13:30:00Z",
    tags: ["VS Code", "扩展", "开发工具", "前端"],
    views: 2100,
    downloads: 234,
  },
  {
    id: "4",
    name: "React 项目脚手架",
    description: "基于 Vite + TypeScript + Tailwind CSS 的 React 项目模板",
    size: "15.2MB",
    categoryId: "5",
    categoryName: "模板资源",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-10T14:45:00Z",
    updatedAt: "2024-01-21T10:15:00Z",
    tags: ["React", "Vite", "TypeScript", "Tailwind"],
    views: 1680,
    downloads: 178,
  },
  {
    id: "5",
    name: "Node.js 性能优化指南",
    description: "Node.js 应用性能优化的完整指南，包含监控、调试、优化技巧",
    size: "18.9MB",
    categoryId: "3",
    categoryName: "学习资料",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-08T16:30:00Z",
    updatedAt: "2024-01-18T12:20:00Z",
    tags: ["Node.js", "性能优化", "后端", "教程"],
    views: 950,
    downloads: 67,
  },
  {
    id: "6",
    name: "图标库 - Feather Icons",
    description: "简洁美观的 Feather 图标库，支持多种格式和尺寸",
    size: "5.4MB",
    categoryId: "2",
    categoryName: "设计资源",
    downloadLinks: createDownloadLinks(3),
    createdAt: "2024-01-14T08:20:00Z",
    updatedAt: "2024-01-20T15:40:00Z",
    tags: ["图标", "Feather", "SVG", "设计"],
    views: 1450,
    downloads: 189,
  },
  {
    id: "7",
    name: "Docker 容器化部署脚本",
    description: "一键部署脚本，支持多种应用的 Docker 容器化部署",
    size: "22.1MB",
    categoryId: "4",
    categoryName: "实用工具",
    downloadLinks: createDownloadLinks(1),
    createdAt: "2024-01-11T13:15:00Z",
    updatedAt: "2024-01-19T09:30:00Z",
    tags: ["Docker", "部署", "脚本", "DevOps"],
    views: 780,
    downloads: 45,
  },
  {
    id: "8",
    name: "TypeScript 类型定义集合",
    description: "常用库的 TypeScript 类型定义文件集合，提升开发体验",
    size: "7.8MB",
    categoryId: "1",
    categoryName: "开发工具",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-16T10:45:00Z",
    updatedAt: "2024-01-22T11:20:00Z",
    tags: ["TypeScript", "类型定义", "开发工具"],
    views: 1120,
    downloads: 98,
  },
  {
    id: "9",
    name: "Next.js 全栈项目模板",
    description: "包含认证、数据库、API 路由的完整 Next.js 项目模板",
    size: "35.6MB",
    categoryId: "5",
    categoryName: "模板资源",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-09T15:20:00Z",
    updatedAt: "2024-01-21T14:10:00Z",
    tags: ["Next.js", "全栈", "模板", "认证"],
    views: 1890,
    downloads: 145,
  },
  {
    id: "10",
    name: "Git 工作流最佳实践",
    description: "团队协作中的 Git 工作流规范和最佳实践指南",
    size: "11.2MB",
    categoryId: "3",
    categoryName: "学习资料",
    downloadLinks: createDownloadLinks(1),
    createdAt: "2024-01-13T12:30:00Z",
    updatedAt: "2024-01-20T16:50:00Z",
    tags: ["Git", "工作流", "团队协作", "最佳实践"],
    views: 1350,
    downloads: 112,
  },
  {
    id: "11",
    name: "Postman API 测试集合",
    description: "常用 API 接口的 Postman 测试集合，包含各种场景",
    size: "6.7MB",
    categoryId: "1",
    categoryName: "开发工具",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-17T09:40:00Z",
    updatedAt: "2024-01-22T13:25:00Z",
    tags: ["Postman", "API测试", "接口", "测试"],
    views: 980,
    downloads: 76,
  },
  {
    id: "12",
    name: "CSS 动画效果库",
    description: "丰富的 CSS 动画效果库，包含过渡、变换、关键帧动画",
    size: "9.3MB",
    categoryId: "2",
    categoryName: "设计资源",
    downloadLinks: createDownloadLinks(3),
    createdAt: "2024-01-15T11:25:00Z",
    updatedAt: "2024-01-21T10:35:00Z",
    tags: ["CSS", "动画", "效果", "前端"],
    views: 1650,
    downloads: 134,
  },
  {
    id: "13",
    name: "数据库设计规范文档",
    description: "企业级数据库设计规范和最佳实践文档",
    size: "14.8MB",
    categoryId: "3",
    categoryName: "学习资料",
    downloadLinks: createDownloadLinks(1),
    createdAt: "2024-01-07T14:50:00Z",
    updatedAt: "2024-01-18T15:20:00Z",
    tags: ["数据库", "设计规范", "最佳实践", "文档"],
    views: 720,
    downloads: 58,
  },
  {
    id: "14",
    name: "自动化测试脚本集合",
    description: "前端自动化测试脚本，支持 E2E 和单元测试",
    size: "19.5MB",
    categoryId: "4",
    categoryName: "实用工具",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-12T16:15:00Z",
    updatedAt: "2024-01-19T12:40:00Z",
    tags: ["自动化测试", "E2E", "单元测试", "脚本"],
    views: 890,
    downloads: 67,
  },
  {
    id: "15",
    name: "Vue 3 + Pinia 状态管理模板",
    description: "基于 Vue 3 和 Pinia 的完整状态管理解决方案模板",
    size: "28.3MB",
    categoryId: "5",
    categoryName: "模板资源",
    downloadLinks: createDownloadLinks(2),
    createdAt: "2024-01-06T10:30:00Z",
    updatedAt: "2024-01-17T14:15:00Z",
    tags: ["Vue", "Pinia", "状态管理", "模板"],
    views: 2100,
    downloads: 189,
  },
];

// 模拟 API 响应延迟
export const mockDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// 模拟分页数据
export const paginateData = <T>(
  data: T[],
  page: number = 1,
  pageSize: number = 20
) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = data.slice(startIndex, endIndex);

  return {
    items,
    total: data.length,
    page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize),
  };
};

// 模拟搜索功能
export const searchResources = (
  resources: Resource[],
  keyword?: string,
  categoryId?: string,
  tags?: string[]
): Resource[] => {
  let filteredResources = [...resources];

  // 按关键词搜索
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filteredResources = filteredResources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(lowerKeyword) ||
        resource.description.toLowerCase().includes(lowerKeyword) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  }

  // 按分类筛选
  if (categoryId) {
    filteredResources = filteredResources.filter(
      (resource) => resource.categoryId === categoryId
    );
  }

  // 按标签筛选
  if (tags && tags.length > 0) {
    filteredResources = filteredResources.filter((resource) =>
      tags.some((tag) => resource.tags.includes(tag))
    );
  }

  return filteredResources;
};

// 模拟排序功能
export const sortResources = (
  resources: Resource[],
  sortBy: string = "createdAt",
  sortOrder: "asc" | "desc" = "desc"
): Resource[] => {
  return [...resources].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        break;
      case "views":
        aValue = a.views;
        bValue = b.views;
        break;
      case "downloads":
        aValue = a.downloads;
        bValue = b.downloads;
        break;
      case "updatedAt":
        aValue = new Date(a.updatedAt).getTime();
        bValue = new Date(b.updatedAt).getTime();
        break;
      case "createdAt":
      default:
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
