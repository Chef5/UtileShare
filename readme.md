# UtileShare

![image](https://img.cdn.1zdz.cn/github/readme/UtileShare.png)

> 本项目主要基于AI开发

UtileShare 的名称源自拉丁语 "Utile"，意为 "实用的、有用的" —— 这是一个以 "实用" 为锚点的资源分享网站。

**作为一个资源分享博主，我本来是想直接找个项目用于分享使用，但是找了一圈没找到想要的简洁、高效的分享项目，并且还有很多分享项目有相对应的定制化后端项目。
于是我就自己开发一个算了，不对，直接让AI帮我快速开发一个算了！！！**

## 技术栈

- Vue 3 + TypeScript + Vite
- Pinia (状态管理) + Vue Router 4 (路由)
- Tailwind CSS (样式) + VueUse (工具库)
- Axios (HTTP 客户端)
- Web Crypto API (安全加密)

## 项目配置 

### 环境变量配置

请复制 `env.example` 文件为 `.env` 并根据需要修改：

```bash
# API基础配置
VITE_API_BASE_URL=http://localhost:3000  # API服务器地址
VITE_API_TIMEOUT=10000                   # API请求超时时间(毫秒)
```

### 应用配置

项目配置文件位于 `src/config.json`，包含以下配置项：

```json
{
  "useMockData": true,          // 是否使用模拟数据
  "theme": true,                // 是否启用主题切换
  "defaultTheme": "light",      // 默认主题 (light/dark)
  "github": true,               // 是否显示GitHub链接
  
  "app": {
    "title": "UtileShare",      // 应用标题
    "description": "UtileShare是一个专注于实用资源分享的网站，致力于为用户提供高质量的资源下载和分享服务"
  },
  
  "api": {
    "endpoints": {
      "resources": {
        "list": "/api/resources",        // 资源列表接口
        "detail": "/api/resources/:id"   // 资源详情接口
      },
      "categories": {
        "list": "/api/categories"        // 分类列表接口
      }
    }
  },
  
  "security": {
    "enable": true,               // 是否启用安全加密
    "sign": {
      "algo": "SHA-256",
      "secret": "CHANGE_ME_SIGN_SECRET"  // ⚠️ 生产环境必须修改
    },
    "encrypt": {
      "algo": "AES-128-CBC",
      "keyBase64": "MDEyMzQ1Njc4OWFiY2RlZg==",  // ⚠️ 生产环境必须修改
      "ivBase64": "YWJjZGVmMDEyMzQ1Njc4OQ=="    // ⚠️ 生产环境必须修改
    },
    "transport": {
      "payloadField": "payload",          // 加密数据字段名
      "headerKey": "X-Utile-Payload",    // 自定义请求头
      "headerValue": "encrypted"         // 请求头值
    }
  }
}
```

## 许可证

本项目采用 [MIT 许可证](LICENSE) 开源。您可以自由使用、修改和分发本项目，但请保留版权声明。
