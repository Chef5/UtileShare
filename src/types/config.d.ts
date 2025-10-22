/**
 * 配置文件类型定义
 */

export interface AppConfig {
  useMockData: boolean;
  theme: boolean;
  defaultTheme: "light" | "dark";
  github: boolean;
  app: {
    title: string;
    description: string;
  };
  api: {
    endpoints: {
      resources: {
        list: string;
        detail: string;
        download: string;
      };
      categories: {
        list: string;
      };
    };
  };
  security: {
    enable: boolean;
    sign: {
      algo: string;
      secret: string;
    };
    encrypt: {
      algo: string;
      keyBase64: string;
      ivBase64: string;
    };
    transport: {
      payloadField: string;
      headerKey: string;
      headerValue: string;
    };
  };
  seo?: {
    /**
     * 是否启用搜索引擎爬虫限制
     * - true: 全站启用私密模式，完全禁止爬取
     * - false: 允许搜索引擎正常爬取（公开模式）
     * @default false
     */
    blockCrawlers: boolean;
    /**
     * 是否在构建时包含测试页面
     * - true: 包含测试页面 test-robots.html（默认）
     * - false: 构建时移除测试页面
     * @default true
     */
    includeTestPage?: boolean;
  };
}

declare module "@/config.json" {
  const config: AppConfig;
  export default config;
}
