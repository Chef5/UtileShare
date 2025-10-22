/**
 * 构建前脚本 - 根据配置动态生成 public 文件
 *
 * 功能：
 * 1. 根据 config.json 中的 seo.blockCrawlers 配置
 * 2. 从 src/assets 复制对应的 robots.txt 版本到 public
 * 3. 从 src/assets 复制对应的 security.txt 版本到 public
 * 4. 决定是否包含测试文件
 * 5. 动态注入 SEO meta 标签到 index.html
 */

import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
  unlinkSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const publicDir = join(rootDir, "public");
const assetsDir = join(rootDir, "src", "assets");
const configPath = join(rootDir, "src", "config.json");

// 读取配置文件
let config;
try {
  const configContent = readFileSync(configPath, "utf-8");
  config = JSON.parse(configContent);
} catch (error) {
  console.error("❌ 无法读取配置文件:", error.message);
  process.exit(1);
}

const blockCrawlers = config.seo?.blockCrawlers ?? true;
const mode = blockCrawlers ? "private" : "public";

console.log("\n🔧 开始构建前配置...");
console.log(`📋 模式: ${blockCrawlers ? "私密模式 🔒" : "公开模式 🌐"}`);

// 1. 复制 robots.txt
const sourceRobots = join(assetsDir, `robots.${mode}.txt`);
const targetRobots = join(publicDir, "robots.txt");

try {
  if (existsSync(sourceRobots)) {
    copyFileSync(sourceRobots, targetRobots);
    console.log(
      `✅ 已生成 robots.txt (${blockCrawlers ? "私密版本" : "公开版本"})`
    );
  } else {
    console.warn(`⚠️  源文件不存在: ${sourceRobots}`);
  }
} catch (error) {
  console.error("❌ 复制 robots.txt 失败:", error.message);
}

// 2. 复制 security.txt
const sourceSecurity = join(assetsDir, `security.${mode}.txt`);
const targetSecurity = join(publicDir, "security.txt");

try {
  if (existsSync(sourceSecurity)) {
    copyFileSync(sourceSecurity, targetSecurity);
    console.log(
      `✅ 已生成 security.txt (${blockCrawlers ? "私密版本" : "公开版本"})`
    );
  } else {
    console.warn(`⚠️  源文件不存在: ${sourceSecurity}`);
  }
} catch (error) {
  console.error("❌ 复制 security.txt 失败:", error.message);
}

// 3. 根据配置决定是否包含测试文件
const testFile = join(publicDir, "test-robots.html");

if (config.seo?.includeTestPage === false) {
  // 如果配置明确要求不包含测试页面
  if (existsSync(testFile)) {
    try {
      unlinkSync(testFile);
      console.log("🗑️  已移除测试页面 (test-robots.html)");
    } catch (error) {
      console.warn("⚠️  无法删除测试页面:", error.message);
    }
  }
} else {
  // 默认保留测试页面
  if (existsSync(testFile)) {
    console.log("✅ 保留测试页面 (test-robots.html)");
  }
}

// 注：SEO meta 标签的注入现在由 Vite 插件处理
// 在构建时动态注入到 dist/index.html，不修改源文件
console.log("ℹ️  SEO meta 标签将在构建时由 Vite 插件注入");

// 4. 输出配置摘要
console.log("\n📊 配置摘要:");
console.log(`   - 爬虫限制: ${blockCrawlers ? "启用 ✓" : "禁用 ✗"}`);
console.log(`   - robots.txt: ${mode}版本`);
console.log(`   - security.txt: ${mode}版本`);
console.log(
  `   - 测试页面: ${config.seo?.includeTestPage === false ? "不包含" : "包含"}`
);
console.log(`   - SEO meta 注入: 由 Vite 插件处理`);

console.log("\n✨ 构建前配置完成!\n");
