/**
 * SEO 和搜索引擎爬虫控制工具
 * 根据 config.json 中的 blockCrawlers 配置统一管理全站爬虫规则
 */

import config from "@/config.json";

/**
 * 检查是否启用爬虫限制
 * @returns 是否启用爬虫限制
 */
export function isCrawlerBlockEnabled(): boolean {
  return config.seo?.blockCrawlers ?? false;
}

/**
 * 设置页面的 robots meta 标签
 * 根据 blockCrawlers 配置自动设置为公开或私密模式
 */
export function setMetaRobots(): void {
  // 如果未启用爬虫限制，设置为完全公开
  if (!isCrawlerBlockEnabled()) {
    setPublicMetaTags();
    return;
  }

  // 启用爬虫限制时，全站强制设置为私密模式
  const content = "noindex, nofollow, noarchive, nosnippet, noimageindex";

  // 更新或创建 robots meta 标签
  updateMetaTag("robots", content);

  // 同时设置特定搜索引擎的 meta 标签
  updateMetaTag("googlebot", content);
  updateMetaTag("bingbot", content);
}

/**
 * 设置为完全公开的 meta 标签
 */
function setPublicMetaTags(): void {
  const content = "index, follow";
  updateMetaTag("robots", content);
  updateMetaTag("googlebot", content);
  updateMetaTag("bingbot", content);
}

/**
 * 更新或创建 meta 标签
 * @param name meta 标签的 name 属性
 * @param content meta 标签的 content 属性
 */
function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector(`meta[name="${name}"]`);

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}
