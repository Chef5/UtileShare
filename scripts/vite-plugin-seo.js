/**
 * Vite 插件 - 构建时动态注入 SEO meta 标签
 *
 * 功能：
 * 1. 在构建时读取配置
 * 2. 将 SEO meta 标签动态注入到 dist/index.html
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 生成 SEO meta 标签内容
 */
function generateSeoMetaTags(config) {
  const isPrivate = config.seo?.blockCrawlers === true;

  if (!isPrivate) {
    // 公开模式：不注入任何 SEO 限制标签
    return "";
  }

  // 私密模式：注入爬虫限制标签
  return `
    <!-- 通用搜索引擎爬虫控制 -->
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
    
    <!-- 主流搜索引擎爬虫 -->
    <meta name="googlebot" content="noindex, nofollow, noarchive" />
    <meta name="bingbot" content="noindex, nofollow, noarchive" />
    <meta name="slurp" content="noindex, nofollow" /><!-- Yahoo -->
    <meta name="duckduckbot" content="noindex, nofollow" />
    <meta name="baiduspider" content="noindex, nofollow" />
    <meta name="yandex" content="noindex, nofollow" />
    <meta name="sogou" content="noindex, nofollow" />
    <meta name="360spider" content="noindex, nofollow" />
    
    <!-- AI 训练爬虫 -->
    <meta name="ChatGPT" content="noindex, nofollow" />
    <meta name="GPTBot" content="noindex, nofollow" />
    <meta name="ChatGPT-User" content="noindex, nofollow" />
    <meta name="CCBot" content="noindex, nofollow" /><!-- Common Crawl -->
    <meta name="anthropic-ai" content="noindex, nofollow" />
    <meta name="Claude-Web" content="noindex, nofollow" />
    <meta name="Google-Extended" content="noindex, nofollow" /><!-- Google AI训练 -->
    <meta name="PerplexityBot" content="noindex, nofollow" />
    <meta name="Applebot-Extended" content="noindex, nofollow" /><!-- Apple AI训练 -->
    <meta name="Amazonbot" content="noindex, nofollow" />
    <meta name="FacebookBot" content="noindex, nofollow" />
    <meta name="Bytespider" content="noindex, nofollow" /><!-- 字节跳动 -->
    <meta name="Diffbot" content="noindex, nofollow" />
    
    <!-- 其他常见爬虫 -->
    <meta name="ia_archiver" content="noindex, nofollow" /><!-- Internet Archive -->
    <meta name="archive.org_bot" content="noindex, nofollow" />
    <meta name="SemrushBot" content="noindex, nofollow" />
    <meta name="AhrefsBot" content="noindex, nofollow" />
    <meta name="DotBot" content="noindex, nofollow" />
    <meta name="MJ12bot" content="noindex, nofollow" />
    <meta name="BLEXBot" content="noindex, nofollow" />
    
    <!-- 防止缓存敏感内容 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />`;
}

/**
 * Vite 插件：在构建时注入 SEO meta 标签
 */
export default function viteSeoPlugin() {
  let config = null;

  return {
    name: "vite-plugin-seo",

    // 在配置解析时加载 config.json
    configResolved() {
      try {
        const configPath = join(__dirname, "..", "src", "config.json");
        const configContent = readFileSync(configPath, "utf-8");
        config = JSON.parse(configContent);
      } catch (error) {
        console.error("❌ 读取 config.json 失败:", error.message);
        config = { seo: { blockCrawlers: true } }; // 默认使用私密模式
      }
    },

    // 在生成 HTML 时注入 SEO 标签
    transformIndexHtml(html) {
      if (!config) {
        return html;
      }

      const seoStartMarker = "<!-- SEO_META_START -->";
      const seoEndMarker = "<!-- SEO_META_END -->";

      // 检查是否存在标记
      if (!html.includes(seoStartMarker)) {
        console.warn("⚠️  未找到 SEO_META_START 标记，跳过注入");
        return html;
      }

      // 生成 SEO meta 标签
      const seoMetaTags = generateSeoMetaTags(config);

      // 替换标记之间的内容
      const seoBlock = `${seoStartMarker}${seoMetaTags}
    ${seoEndMarker}`;

      const seoRegex = new RegExp(
        `${seoStartMarker}[\\s\\S]*?${seoEndMarker}`,
        "g"
      );

      const result = html.replace(seoRegex, seoBlock);

      const mode = config.seo?.blockCrawlers ? "私密模式 🔒" : "公开模式 🌍";
      console.log(`✅ 已注入 SEO 标签 (${mode})`);

      return result;
    },
  };
}
