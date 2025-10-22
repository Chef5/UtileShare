/**
 * SEO 管理组合式函数
 * 用于在 Vue 组件中管理 SEO 和搜索引擎爬虫规则
 */

import { onMounted, watch, type Ref } from "vue";
import { setMetaRobots, isCrawlerBlockEnabled } from "@/utils/seo";

// 导出爬虫限制状态检查函数
export { isCrawlerBlockEnabled };

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
}

/**
 * 使用 SEO 管理
 * @param config SEO 配置或响应式配置
 * @returns SEO 管理方法
 */
export function useSEO(config?: SEOConfig | Ref<SEOConfig>) {
  /**
   * 更新页面 SEO 信息
   */
  const updateSEO = (seoConfig: SEOConfig) => {
    // 更新标题
    if (seoConfig.title) {
      document.title = seoConfig.title;
    }

    // 更新描述
    if (seoConfig.description) {
      updateMeta("description", seoConfig.description);
    }

    // 更新关键词
    if (seoConfig.keywords) {
      updateMeta("keywords", seoConfig.keywords);
    }
  };

  /**
   * 更新 meta 标签
   */
  const updateMeta = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
  };

  // 组件挂载时应用配置
  onMounted(() => {
    if (config) {
      const seoConfig = "value" in config ? config.value : config;
      updateSEO(seoConfig);
    }

    // 应用全局爬虫规则（根据 blockCrawlers 配置）
    setMetaRobots();
  });

  // 如果配置是响应式的，监听变化
  if (config && "value" in config) {
    watch(
      config,
      (newConfig) => {
        updateSEO(newConfig);
      },
      { deep: true }
    );
  }

  return {
    updateSEO,
  };
}
