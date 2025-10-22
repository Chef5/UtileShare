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

// 输出构建配置信息
console.log(`网站名称: ${config.app.title}`);
console.log(`网站描述: ${config.app.description}`);

console.log("\n📋 构建配置:");
console.log(`   • 使用模拟数据: ${config.useMockData ? "✓" : "✗"}`);
console.log(
  `   • 主题切换: ${config.theme ? "✓" + " " + config.defaultTheme : "✗"}`
);
console.log(`   • 接口亲求加密: ${config.security?.enable ? "✓" : "✗"}`);
console.log(`   • SEO 模式: ${blockCrawlers ? "私密 🔒" : "公开"}`);
console.log(
  `   • 测试页面: ${config.seo?.includeTestPage !== false ? " ✓" : "✗"}`
);

// 1. 复制 robots.txt
const sourceRobots = join(assetsDir, `robots.${mode}.txt`);
const targetRobots = join(publicDir, "robots.txt");

try {
  if (existsSync(sourceRobots)) {
    copyFileSync(sourceRobots, targetRobots);
  } else {
    console.warn(`   ⚠️  源文件不存在: ${sourceRobots}`);
  }
} catch (error) {
  console.error(`   ❌ 复制 robots.txt 失败: ${error.message}`);
}

// 2. 复制 security.txt
const sourceSecurity = join(assetsDir, `security.${mode}.txt`);
const targetSecurity = join(publicDir, "security.txt");

try {
  if (existsSync(sourceSecurity)) {
    copyFileSync(sourceSecurity, targetSecurity);
  } else {
    console.warn(`   ⚠️  源文件不存在: ${sourceSecurity}`);
  }
} catch (error) {
  console.error(`   ❌ 复制 security.txt 失败: ${error.message}`);
}

// 3. 根据配置决定是否包含测试文件
const testFile = join(publicDir, "test-robots.html");

if (config.seo?.includeTestPage === false) {
  // 如果配置明确要求不包含测试页面
  if (existsSync(testFile)) {
    try {
      unlinkSync(testFile);
    } catch (error) {
      console.warn(`\n⚠️  无法删除测试页面: ${error.message}`);
    }
  }
}

console.log("");
